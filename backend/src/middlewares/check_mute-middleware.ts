/**
 * check whether the user is muted or not. if muted, return 403 with a message. if not, continue.
 */

import { NextFunction } from "express";
import { Request } from "express";
import { Response } from "express";
import prisma from "../../prisma/prisma_client"


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