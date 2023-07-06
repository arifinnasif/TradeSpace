import { Request, Response} from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export let getUsers = async (req:Request, res:Response) => {
    try {
        const userList = await prisma.users.findMany();
        console.log(userList);
        res.json(userList);
    } catch (error) {
        console.log(error)
    }
}