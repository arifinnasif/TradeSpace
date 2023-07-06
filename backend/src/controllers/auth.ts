import { Request, Response} from 'express';

// import prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// get user list: /api/auth/getUsers
// DELETE later
let getUsers = async (req:Request, res:Response) => {
    try {
        const userList = await prisma.users.findMany();
        console.log(userList);
        res.json(userList);
    } catch (error) {
        console.log(error)
    }
}


// register user: /api/auth/register
let registerUser = async (req:Request, res:Response) => {
    console.log("registering user");
}


export { getUsers, registerUser}