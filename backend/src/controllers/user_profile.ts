import { Request, Response } from "express";

// import prisma client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



// get user profile: /api/profile
let get_user_profile = async (req: Request, res: Response) => {
    const user: any = req.user;
    
    // retrieve user profile from db
    try{
        const userProfile = await prisma.users.findUnique({
            where: { username: user.username },
            select: {
                username: true,
                name: true,
                email: true,
                phone: true,
                dob: true,
                gender: true
            }
        });

        // user not found
        if (!userProfile) {
            return res.status(404).json({
                success: false,
                error: 'User not found!'
            });
        }

        // return user profile
        return res.status(200).json(userProfile)
    }
    catch(error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

}



// update user profile: /api/profile
let update_user_profile = async (req: Request, res: Response) => {
    const user: any = req.user;
    
}

export { get_user_profile, update_user_profile }