import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/prisma_client"


/**
 * apply this middleware before features that are not available to muted users
 * checks whether the user is muted or not. if muted, return 403 with a message. if not, continue.
 * must be used after an authUser middleware
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const check_mute = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        console.log('you should use check_mute middleware after an authUser middleware. exiting...');
        process.exit(1);
    }
    try {
        const user = await prisma.users.findUnique({
            where: {
                username: req.user.username
            },

            select: {
                mute_end_date: true,
            }
        });

        if (user!.mute_end_date > new Date()) {
            return res.status(403).json({
                success: false,
                error: `You are muted until ${user!.mute_end_date}. You cannot perform this action.`,
            });
        }

        next();
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}