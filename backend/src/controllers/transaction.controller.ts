import prisma from "../../prisma/prisma_client";

// get all transactions: /api/admin/transactions
export const get_all_transactions_admin = async (req: any, res: any) => {
    try {
        const transactions = await prisma.transactions.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });

        return res.status(200).json(transactions);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// get user transactions: /api/profile/transactions/
export const get_user_transactions = async (req: any, res: any) => {
    try {
        const transactions = await prisma.transactions.findMany({
            where: {
                username: req.user.username,
                status: 'paid'
            },
            select: {
                trx_id: true,
                promotion: true,
                amount: true,
                method: true,
                created_at: true,
                ad_id: true,
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        let transactions_with_ad_info = [];


        // I am here forced to call db in a loop because transactions table does not have pointers to ads table
        // may be joins can be used here
        for (let i = 0; i < transactions.length; i++) {

            const active_ad_info = await prisma.ads.findUnique({
                where: {
                    id: transactions[i].ad_id,
                    // status: 'approved' // not needed because we are only have paid transactions on approved ads
                },
                select: {
                    title: true,
                    image1: true,
                    price: true,
                }
            });

            if (active_ad_info) {
                transactions_with_ad_info.push({
                    ...transactions[i],
                    ad_title: active_ad_info.title,
                    ad_image: active_ad_info.image1,
                    ad_price: active_ad_info.price,
                    is_active_ad: true,
                });

                continue;
            }

            const archived_ad_info = await prisma.archived_ads.findUnique({
                where: {
                    id: transactions[i].ad_id
                },
                select: {
                    title: true,
                    image1: true,
                    price: true,
                }
            });

            if (archived_ad_info) {
                transactions_with_ad_info.push({
                    ...transactions[i],
                    ad_title: archived_ad_info.title,
                    ad_image: archived_ad_info.image1,
                    ad_price: archived_ad_info.price,
                    is_active_ad: false,
                });

                continue;
            }
        }


        return res.status(200).json(transactions_with_ad_info);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}