import prisma from '../../prisma/prisma_client';



// get all notifications: /api/profile/notifications
export const get_user_notifications = async (req: any, res: any) => {
    try {
        const notifications = await prisma.notifications.findMany({
            where: {
                user: {
                    username: req.user.username
                }
            },
            orderBy: {
                created_at: 'desc'
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

// update notification seen status: /api/profile/notifications
export const update_notification_seen_status = async (req: any, res: any) => {
    const user : any = req.user;

    try {
        // Find notifications for the specific user where is_seen is false
        const notificationsToUpdate = await prisma.notifications.findMany({
            where: {
            username: user.username,
            is_seen: false,
            },
        });


        // Update the found notifications to set is_seen to true
        const updatedNotifications = await prisma.notifications.updateMany({
            where: {
            id: {
                in: notificationsToUpdate.map((notification) => notification.id),
            },
            },
            data: {
            is_seen: true,
            },
        });

        return res.status(200).json({
            success: true,
            message: 'Notification seen status updated successfully!'
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
    

export const notify_user = async (username: string, type: string, title: string, description: string) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (!user) return;

        const notification = await prisma.notifications.create({
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