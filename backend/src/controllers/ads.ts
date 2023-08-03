import { Request, Response } from 'express';


// import prisma client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();




// post ad: /api/ads/post-ad
let postAd = async (req: Request, res: Response) => {
    
    // retrieve user object
    const user: any = req.user;
    
    const { category_name, title, description, price, 
            is_negotiable, is_used, is_phone_public,
            days_used, address, promotion_type } = req.body;

    try {
        
        // create a new ad
        await prisma.ads.create({
            data: {
                op_username: user.username,
                category_name: category_name,
                title: title,
                description: description,
                price: Number(price),

                // Do not use Boolean(string) here. 
                // Any string which isn't the empty string will evaluate to true by Boolean(string).
                is_negotiable: (is_negotiable === 'true'),
                is_used: (is_used === 'true'),
                is_phone_public: (is_phone_public === 'true'),
                
                days_used: Number(days_used),
                address: address,
                promotion_type: promotion_type
            }
        });

        // Post ad successfull.
        return res.status(200).json({
            success: true,
            message: 'Ad posted successfully!'
        });
    } 
    catch (error: any) {
        console.log(error);
        
        // Post ad failed.
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
    
    
}

export { postAd }