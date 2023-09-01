import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import _ from 'lodash';
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';


dotenv.config();


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
        const new_message = await prisma.text_chats.create({
            data: {
                thread_id: thread_id,
                sender_username: req.user.username,
                receiver_username: thread.op_username === req.user.username ? thread.client_username : thread.op_username,
                text: req.body.message
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