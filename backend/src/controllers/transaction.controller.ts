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
                username: req.user.username
            },
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