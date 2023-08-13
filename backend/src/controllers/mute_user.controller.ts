import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import { notify_user } from './user_notification.controller';
import * as dotenv from "dotenv";

dotenv.config();

/**
 * checks whether the user exists or not and then sets mute_end_date to the current date + duration
 * notifies the user why he is muted
 * @param req 
 * @param res 
 * @returns
 */

// mute user: /api/admin/mute_user/:username
const mute_user = async (req: Request, res: Response) => {
    const username = req.params.username;

    const target_user = await prisma.users.findUnique({
        where: {
            username: username
        }
    });

    if (!target_user) {
        return res.status(404).json({ error: "User does not exist." });
    }

    const mute_duration_in_sec: number = +(req.body.duration.days ? req.body.duration.days : 0) * 24 * 60 * 60 + +(req.body.duration.hours ? req.body.duration.hours : 0) * 60 * 60;

    // if (target) {
    const mute = await prisma.users.update({
        where: {
            username: username
        },
        data: {
            mute_end_date: new Date(Date.now() + mute_duration_in_sec * 1000)
        }
    });

    // notify
    notify_user(username,
        "user mgt",
        "You have been muted",
        `You have been muted by an admin (@${req.user?.username}) for ${req.body.duration.days} days and ${req.body.duration.hours} hours`)

    // send success response
    return res.status(200).json({ success: true, message: `User @${username} have been muted successfully.` });
}

export { mute_user };