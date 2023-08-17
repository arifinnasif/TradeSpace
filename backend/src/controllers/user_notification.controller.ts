import prima from '../../prisma/prisma_client';
import * as dotenv from "dotenv";
dotenv.config();


// get all notifications: /api/profile/notifications
export const get_user_notifications = async (req: any, res: any) => {
    try {
        const notifications = await prima.notifications.findMany({
            where: {
                user: {
                    username: req.user.username
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json(notifications);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export const notify_user = async (username: string, type: string, title: string, description: string) => {
    try {
        const user = await prima.users.findUnique({
            where: {
                username: username
            }
        });

        if (!user) return;

        const notification = await prima.notifications.create({
            data: {
                type: type,
                title: title,
                description: description,
                user: {
                    connect: {
                        username: user.username
                    }
                }
            }
        });

        return notification;
    } catch (error: any) {
        console.log(error);
    }
}