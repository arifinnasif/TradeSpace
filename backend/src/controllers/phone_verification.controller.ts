import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { request_to_verify_opt_code } from '../services/twilio_phone_verification';
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";


dotenv.config();

const prisma = new PrismaClient();

const verify_phone = async (req: Request, res: Response) => {
    // extract username from jwt token
    const token = req.cookies['token'];
    let decoded_token = jwt.verify(token, process.env.SECRET!) as { username: string, email: string };

    // check if the user exists
    const user = await prisma.users.findUnique({
        where: {
            username: decoded_token.username

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
    if (user.phone !== req.body.phone_number) {
        return res.status(400).json({
            success: false,
            message: 'Phone number does not match!'
        });
    }

    // check if the user has already verified their phone number
    if (user.phone_verified) {
        return res.status(400).json({
            success: false,
            message: 'Phone number already verified!'
        });
    }


    const is_otp_valid = await request_to_verify_opt_code(req.body.phone_number, req.body.otp_code);
    if (is_otp_valid) {
        await prisma.users.update({
            where: {
                username: req.body.username
            },
            data: {
                phone_verified: true
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Phone number verified!'
        });
    }
}