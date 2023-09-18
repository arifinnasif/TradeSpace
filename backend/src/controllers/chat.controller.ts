import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';



// get chat thread: /api/chat/:ad_id
export const get_chat_thread = async (req: Request, res: Response) => {

    try {
        const ad_id = Number(req.params.ad_id);


        // check if the ad exists
        const ad = await prisma.ads.findUnique({
            where: {
                id: ad_id
            }
        });

        if (!ad || ad.status !== 'approved') {
            return res.status(404).json({
                success: false,
                error: "ad not found!"
            });
        }

        // check if the user is the owner of the ad
        if (ad.op_username === req.user.username) {
            return res.status(403).json({
                success: false,
                error: "You are the owner of this ad! You can't chat with yourself!"
            });
        }

        // get the chat thread
        const chat_thread = await prisma.threads.findFirst({
            where: {
                AND: [
                    { ad_id: ad_id },
                    { client_username: req.user.username }
                ]

            },
            select: {
                id: true,
            }
        });

        // if thread doesn't exist, create a new thread
        if (!chat_thread) {
            const new_thread = await prisma.threads.create({
                data: {
                    id: uuidv4(),
                    ad_id: ad_id,
                    op_username: ad.op_username,
                    client_username: req.user.username
                }
            });

            await prisma.chats.create({
                data: {
                    thread_id: new_thread.id,
                    sender_username: req.user.username,
                    receiver_username: ad.op_username,
                    message: " ",
                    is_image: false
                }
            });

            return res.status(201).json({
                success: true,
                thread_id: new_thread.id
            });

        }

        return res.status(200).json({
            success: true,
            thread_id: chat_thread.id
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        });
    }
}

// send message: POST /api/chat/threads/:thread_id
export const send_message = async (req: Request, res: Response) => {
    try {// check if the thread exists
        const thread_id = req.params.thread_id;

        const thread = await prisma.threads.findUnique({
            where: {
                id: thread_id
            }
        });

        if (!thread) {
            return res.status(404).json({
                success: false,
                error: "Thread not found!"
            });
        }

        // check if the user is the participant of the thread
        if (thread.op_username !== req.user.username && thread.client_username !== req.user.username) {
            return res.status(403).json({
                success: false,
                error: "You are not the participant of this thread!"
            });
        }

        // add the message to the thread
        const new_message = await prisma.chats.create({
            data: {
                thread_id: thread_id,
                sender_username: req.user.username,
                receiver_username: thread.op_username === req.user.username ? thread.client_username : thread.op_username,
                message: req.body.message,
                is_image: req.body.is_image,
            }
        });

        // update the thread
        await prisma.threads.update({
            where: {
                id: thread_id
            },
            data: {
                updated_at: new Date()
            }
        });

        return res.status(201).json({
            success: true,
            message: new_message
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        });
    }
}

// get messages: GET /api/chat/threads/:thread_id
export const get_messages = async (req: Request, res: Response) => {
    try {
        // check if the thread exists
        const thread_id = req.params.thread_id;

        const thread = await prisma.threads.findUnique({
            where: {
                id: thread_id
            }
        });

        if (!thread) {
            return res.status(404).json({
                success: false,
                error: "Thread not found!"
            });
        }

        // check if the user is the participant of the thread
        if (thread.op_username !== req.user.username && thread.client_username !== req.user.username) {
            return res.status(403).json({
                success: false,
                error: "You are not the participant of this thread!"
            });
        }

        // mark the messages as read
        await prisma.chats.updateMany({
            where: {
                thread_id: thread_id,
                receiver_username: req.user.username,
                is_read_by_receiver: false
            },
            data: {
                is_read_by_receiver: true
            }
        });


        // get the messages
        const messages_from_db = await prisma.chats.findMany({
            where: {
                thread_id: thread_id
            },
            orderBy: {
                created_at: 'asc'
            },
            // exclude the dummy message
            skip: 1
        });

        const messages_to_send = messages_from_db.map(msg => {
            return {
                sender_username: msg.sender_username,
                receiver_username: msg.receiver_username,
                message: msg.message,
                timestamp: msg.created_at,
                is_image: msg.is_image,
                is_read_by_receiver: msg.is_read_by_receiver,
                is_my_message: msg.sender_username === req.user.username
            }
        });




        return res.status(200).json(messages_to_send);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        });
    }
}


// get chat inbox: GET /api/chat/inbox
export const get_inbox = async (req: Request, res: Response) => {
    try {
        // get the threads
        const threads_from_db = await prisma.threads.findMany({
            where: {
                OR: [
                    { op_username: req.user.username },
                    { client_username: req.user.username }
                ]
            },
            include: {
                ad: {
                    select: {
                        title: true,
                        image1: true,
                        is_sell_ad: true,
                        price: true
                    }
                },
                op: {
                    select: {
                        name: true,
                        profile_pic: true
                    }
                },
                client: {
                    select: {
                        name: true,
                        profile_pic: true
                    }
                },
                chats: {

                    orderBy: {
                        created_at: 'desc'
                    },
                    take: 1
                },
                _count: {
                    select: {
                        chats: {
                            where: {
                                receiver_username: req.user.username,
                                is_read_by_receiver: false
                            }
                        }
                    }
                }
            },

            orderBy: {
                updated_at: 'desc'
            }
        });

        // console.log(threads_from_db);

        let threads_to_send = threads_from_db.map(thread => {

            const last_message = thread.chats.length > 0 ? thread.chats[0] : null;


            return {
                thread_id: thread.id,
                receiver_fullname: thread.op_username === req.user.username ? thread.client.name : thread.op.name,
                receiver_username: thread.op_username === req.user.username ? thread.client_username : thread.op_username,
                receiver_profile_pic: thread.op_username === req.user.username ? thread.client.profile_pic : thread.op.profile_pic,
                ad_id: thread.ad_id,
                ad_title: thread.ad.title,
                ad_image: thread.ad.image1,
                ad_price: thread.ad.price,
                is_sell_ad: thread.ad.is_sell_ad,
                unread_messages_count: thread._count.chats,
                am_i_op: thread.op_username === req.user.username,
                last_message: last_message ? {
                    sender_username: last_message.sender_username,
                    receiver_username: last_message.receiver_username,
                    message: last_message.is_image ? "sent an image" : last_message.message,
                    timestamp: last_message.created_at,
                    is_read_by_receiver: last_message.is_read_by_receiver,
                    is_my_message: last_message.sender_username === req.user.username
                } : null
            }
        });

        // remove threads with no messages
        threads_to_send = threads_to_send.filter(thread => thread.last_message !== null);

        return res.status(200).json(threads_to_send);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        });
    }
}


// get unread messages count: GET /api/chat/unread_msg_count
export const get_unread_msg_count = async (req: Request, res: Response) => {
    try {
        const unread_messages_count = await prisma.chats.count({
            where: {
                receiver_username: req.user.username,
                is_read_by_receiver: false
            }
        });

        return res.status(200).json({
            success: true,
            unread_messages_count: unread_messages_count
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        });
    }
}