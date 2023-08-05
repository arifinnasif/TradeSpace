import { Request, Response } from "express";

// import prisma client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



// get user profile: /api/profile
let get_user_profile = async (req: Request, res: Response) => {
    const user: any = req.user;
    console.log(user);
}

export { get_user_profile }