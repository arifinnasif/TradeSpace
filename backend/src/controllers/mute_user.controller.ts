import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import { notify_user } from './user_notification.controller';
import * as dotenv from "dotenv";

dotenv.config();



const mute_user = async (req: Request, res: Response) => {
    const username = req.user!.username;

    const target_user = await prisma.users.findUnique({
        where: {
            username: username
        }
    });

    if (!target_user) {
        res.status(404).json({ error: "User does not exist." });
        return;
    }

    const mute_duration_in_sec: number = +req.body.duration.days * 24 * 60 * 60 + +req.body.duration.hours * 60 * 60 + +req.body.duration.minutes * 60 + +req.body.duration.seconds;

    // if (target) {
    const mute = await prisma.users.update({
        where: {
            username: username
        },
        data: {
            mute_end_date: new Date(Date.now() + mute_duration_in_sec)
        }
    });

    // notify
    notify_user(req.user!.username,
        "user mgt",
        "You have been muted",
        `You have been muted by an admin for ${req.body.duration.days} days and ${req.body.duration.hours} hours`)

    // send success response
    res.status(200).json({ success: true, message: `User @${username} have been muted successfully.` });
}