import { Request, Response} from 'express';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
const { SECRET } = require('../constants')
import { sendRandomMail, sendVerificationMail } from '../services/mailService';
import crypto from 'crypto';


// import prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();





// get user list: /api/auth/getUsers
// DELETE later
let getUsers = async (req:Request, res:Response) => {
    try {
        const userList = await prisma.users.findMany({
            select: {
                user_id: true,
                name: true,
                email: true,
            }
        });
        return res.json(userList);
    } catch (error) {
        console.log(error)
    }
}






// register user: /api/auth/register
let registerUser = async (req:Request, res:Response) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await hash(password, 12);    
        await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        
        // token creation for email verification
        let token = crypto.randomBytes(32).toString('hex');

        // find user_id using email
        let user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        // entry to tokenEmail table
        await prisma.emailtoken.create({
            data: {
                user_id: user!.user_id, // https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined
                                        // non-null assertion operator. WHAT'S THAT NASIF? WHY TYPESCRIPT?
                token: token
            }
        });
        // send verification-email
        await sendVerificationMail(name, user!.user_id, email, token)

        return res.status(201).json({ 
            success: true,
            message: 'User created!'
        });
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}







// login user: /api/auth/login
let loginUser = async (req:Request, res:Response) => {
    // catch the user from the loginCheck middleware
    const user:any = req.user;

    // create a payload
    // user_id will be used for passport-jwt
    let payload = {
        user_id: user.user_id,
        email: user.email
    }

    try {
        // create a token
        //const token = await sign(payload, SECRET, { expiresIn: '1h' });
        const token = await sign(payload, SECRET);

        // send the token in a HTTP-only cookie
        return res.status(200).cookie('token', token, {httpOnly : true}).json({
            success: true,
            message: 'Logged in successfully!'
       }); 
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}




let logoutUser = async (req:Request, res:Response) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly : true}).json({
            success: true,
            message: 'Logged out successfully!'
       });
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}






let protectedRoute = async (req:Request, res:Response) => {
    try {
        return res.status(200).json({
            data: 'This is a protected route'
        })
    } catch (error:any) {
        console.log(error.message)
    }
}




let verifyEmail = async (req:Request, res:Response) => {
    const user_id: number = +req.params.user_id; //convert string to number
    const token = req.params.token;


    // find user from "users" table.
    // here users.verified will be false
    const user = await prisma.users.findUnique({
        where: {
            user_id: user_id
        }
    });


    // if user does not exist, return error
    if(!user) {
        return res.status(401).json({
            success: false,
            message: 'User does not exist!'
        })
    }


    // find the token from "tokenEmail" table
    const tokenObj = await prisma.emailtoken.findUnique({
        where: {
            user_id: user_id
        }
    });



    // if tokenFromDB does not match with tokenFromRoute, return error
    if(token != tokenObj!.token) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Link!'
        })
    } 
    else {
        // user is verified
        // update the "users" table
        await prisma.users.update({
            where: {
                user_id: user_id
            },
            data: {
                verified: true
            }
        })


        // now delete the token from tokenEmail table
        await prisma.emailtoken.delete({
            where: {
                user_id: user_id
            }
        })


        // send successful response
        return res.status(200).json({
            success: true,
            message: 'Email verified!'
        })

    }

}






export { getUsers, registerUser, loginUser, protectedRoute, logoutUser, verifyEmail}