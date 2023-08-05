import { Request, Response } from "express";

// import prisma client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



// get user profile: /api/profile
let get_user_profile = async (req: Request, res: Response) => {
    
}