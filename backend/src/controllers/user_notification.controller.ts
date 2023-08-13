import prima from '../../prisma/prisma_client';
import * as dotenv from "dotenv";
dotenv.config();

export const notify_user = async (username: string, type: string, title:string, description:string) => {
    try {
        const user = await prima.users.findUnique({
            where: {
                username: username
            }
        });

        if(!user) return;

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