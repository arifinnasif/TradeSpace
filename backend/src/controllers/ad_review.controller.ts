import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import * as dotenv from "dotenv";

const limit = 10;


dotenv.config();

export const get_all_pending_reviews = async (req: Request, res: Response) => {
    try {
        const pending_reviews = await prisma.ads.findMany({
            where: {
                status: 'pending'
            },

            orderBy: {
                createdAt: 'desc'
            },

            skip: (Number(req.query.page||1) - 1) * limit,

            take: limit,
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


export const get_pending_review_details = async (req: Request, res: Response) => {
    try {
        const pending_review = await prisma.ads.findUnique({
            where: {
                id: Number(req.params.id!)
            }
        });

        if(pending_review?.status !== 'pending') return res.status(404).json({});

        return res.status(200).json(pending_review);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

