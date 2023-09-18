import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';

// get buy sell data
const get_buy_sell_data = async () => {

    const buy_sell_data = await prisma.ads.groupBy({
        by: ['is_sell_ad'],
        _count: {
            is_sell_ad: true,
        },

    });

    let id = 1;


    const ret = buy_sell_data.map((data) => {
        const type = data.is_sell_ad ? "sell" : "buy";
        const count = data._count.is_sell_ad;

        return {
            id: id++,
            type,
            count,
        }
    });


    return ret;

}


// get promotion data
const get_promotion_data = async () => {

    const promotion_data = await prisma.ads.groupBy({
        by: ['promotion_type'],
        _count: {
            promotion_type: true,
        },
        where: {
            status: "approved",
        }

    });

    let id = 1;


    const ret = promotion_data.map((data) => {
        const type = data.promotion_type;
        const count = data._count.promotion_type;

        return {
            id: id++,
            type,
            count,
        }
    });

    // console.log(ret);


    return ret;

}


// get ai data
const get_ai_data = async () => {

    const ai_data = await prisma.ads.findMany(
        {
            select: {
                ai_verdict: true,
            },
            where: {
                status: "pending",
            }
        }
    );

    let declinable_count = 0;
    let approvable_count = 0;

    ai_data.forEach((data) => {
        if (JSON.parse(data.ai_verdict.toString()).weighted_threat_score > 0.5) {
            declinable_count++;
        } else {
            approvable_count++;
        }
    });


    return [
        {
            id: 1,
            type: "declinable",
            count: declinable_count,
        },
        {
            id: 2,
            type: "approvable",
            count: approvable_count,
        },
    ];

}


export const get_dashboard_data = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("get dashboard data");
    try {
        const buy_sell_data = await get_buy_sell_data();
        const ai_data = await get_ai_data();
        const promotion_data = await get_promotion_data();

        res.status(200).json({
            buy_sell_data,
            promotion_data,
            ai_data,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

