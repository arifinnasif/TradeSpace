import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { request_to_verify_opt } from '../services/twilio_phone_verification';
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";


dotenv.config();

const prisma = new PrismaClient();

export const verify_phone = async (req: Request, res: Response) => {
    // extract username from jwt token
    // const token = req.cookies['token'];
    // const decoded_token = jwt.verify(token, process.env.SECRET!) as { username: string, email: string };

    // check if the user exists
    const user = await prisma.users.findUnique({
        where: {
            username: req.user.username

        },
        select: {
            phone: true,
            phone_verified: true
        }
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found!'
        });
    }

    // check if the user has the same phone number as the one in the request
    if (user.phone !== req.body.phone) {
        console.log(user.phone, req.body.phone)
        console.log('1 phone number already verified');
        return res.status(400).json({
            success: false,
            message: 'Phone number does not match!'
        });
    }

    // check if the user has already verified their phone number
    if (user.phone_verified) {
        console.log('2 phone number already verified');
        return res.status(400).json({
            success: false,
            message: 'Phone number already verified!'
        });
    }


    const is_otp_valid = await request_to_verify_opt(req.body.phone, req.body.otp);
    if (is_otp_valid) {
        await prisma.users.update({
            where: {
                username: req.user.username
            },
            data: {
                phone_verified: true
            }
        });
        return res.status(200).clearCookie('token', { httpOnly: true }).json({
            success: true,
            message: 'Phone number verified!'
        });
    }
}