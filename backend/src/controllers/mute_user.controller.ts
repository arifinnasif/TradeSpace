import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import { notify_user } from './user_notification.controller';
import * as dotenv from "dotenv";

dotenv.config();

const mute_user = async (req: Request, res: Response) => {
    const username = req.body.username;

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
    // send success response
}