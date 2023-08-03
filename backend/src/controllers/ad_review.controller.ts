import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import { request_to_verify_opt } from '../services/twilio_phone_verification';
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
import { get } from 'http';


dotenv.config();

export const get_all_pending_reviews = async (req: Request, res: Response) => {
    try {
        const pending_reviews = await prisma.ads.findMany({
            where: {
                status: 'pending'
            }
        });

        // console.log(pending_reviews);
        return res.status(200).json(pending_reviews);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

