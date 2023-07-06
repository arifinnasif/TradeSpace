import { Request, Response} from 'express';
import { hash } from 'bcryptjs';

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

}


export { getUsers, registerUser, loginUser}