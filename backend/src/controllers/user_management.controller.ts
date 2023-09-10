import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import { notify_user } from './user_notification.controller';



/**
 * checks whether the user exists or not and then sets mute_end_date to the current date + duration
 * notifies the user why he is muted
 * @param req 
 * @param res 
 * @returns
 */

// mute user: /api/admin/mute_user/:username
export const mute_user = async (req: Request, res: Response) => {
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


// get all users: GET /api/admin/users
export const get_all_users = async (req: Request, res: Response) => {
    const users = await prisma.users.findMany({
        select: {
            username: true,
            dob: true,
            gender: true,
            mute_end_date: true,
            created_at: true,
            posted_ads: true,
        },

        where: {
            email_verified: true,
            phone_verified: true,
        },

        orderBy: {
            created_at: 'desc'
        }
    });

    let users_list_response = [];

    for (let user of users) {
        let pending_ads = 0;
        let approved_ads = 0;
        for (let ad of user.posted_ads) {
            if (ad.status === 'pending') {
                pending_ads++;
            } else if (ad.status === 'approved') {
                approved_ads++;
            }
        }

        let user_list_item = {
            username: user.username,
            age: (new Date().getFullYear() - user.dob.getFullYear()),
            gender: user.gender,
            is_muted: user.mute_end_date > new Date(),
            created_at: user.created_at,
            approved_ads: approved_ads,
            pending_ads: pending_ads,
        }

        users_list_response.push(user_list_item);
    }

    return res.status(200).json(users_list_response);

}



