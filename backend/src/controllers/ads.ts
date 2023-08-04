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

    // retrieve ticket count for promotion type
    const promotion = await prisma.promotions.findUnique({
        where: { promotion_type: promotion_type },

    });

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
                promotion_type: promotion_type,
                
                ticket: promotion!.ticket, // promotion is not null here. Validated in validators/ads.ts
                                           // Hence, ! is used. 
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




/*
 
1. get all ads: api/ads/

2. search ads : api/ads/?search=keyword

3. filter ads : api/ads/?
                        promo_types[]=promo1&promo_types[]=promo2&
                        cat[]=cat1&cat[]=cat2&
                        sort=price,asc/desc& // sort=days_used,desc
                        geo=lat:long&
                        ad_type=sell/buy&
                        page=x&
                        limit=y

 */


let get_ads = async (req:Request, res:Response) => {
    const page = Number(req.query.page)-1 || 0;
    const limit = Number(req.query.limit) || 5;

    //const search_string = req.query.search_string || '';

    const promo_types_q = req.query.promo_types || [];
    let cat_q = req.query.cat || [];
    let sort = req.query.sort || '';
    let geo = req.query.geo || '';
    let ad_type = req.query.ad_type || '';

    
    let promo_types = Array.isArray(promo_types_q) ? promo_types_q : [promo_types_q];
    let categories = Array.isArray(cat_q) ? cat_q : [cat_q];

    
    let sort_by = '';
    let sort_order = '';
    if(sort) {
        const sort_arr = String(sort).split(',');
        sort_by = sort_arr[0];
        sort_order = sort_arr[1];
    }

    //if ad-type is sell, set is_sell_ad to true
    let is_sell_ad = false;
    if(ad_type === 'sell') {
        is_sell_ad = true;
    }


    try {
        // Now get ads with corresoponding promo-types, categories, sort, ad-type
        let ad_list = await prisma.ads.findMany({
            where: {
                AND: [
                    //@ts-ignore
                    { promotion_type: { in: promo_types } },
                    //@ts-ignore
                    { category_name: { in: categories } },
                    { is_sell_ad: is_sell_ad }
                ]
            },
            orderBy: {
                [sort_by]: sort_order
            },
            skip: page*limit,
            take: limit,
            select: {
                id: true,
                op_username: true,
                category_name: true,
                title: true,
                price: true,
                is_negotiable: true,
                is_used: true,
                promotion_type: true,
                createdAt: true,
            }
        });

        // get total number of ads
        const total_ads = await prisma.ads.count({
            where: {
                AND: [
                    //@ts-ignore
                    { promotion_type: { in: promo_types } },
                    //@ts-ignore
                    { category_name: { in: categories } },
                    { is_sell_ad: is_sell_ad }
                ]
            }
        });

        // get total number of pages
        const total_pages = Math.ceil(total_ads/limit);

        const response = {
            success: true,
            total_pages: total_pages,
            total_ads: total_ads,
            ad_list: ad_list
        }

        return res.status(200).json(response);

    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

}
// let get_ads = async (req:Request, res:Response) => {
//     const search_string = req.query.search_string;

//     try {
//         let ad_list = [];

//         // if search_string is present, search for ads containing search_string in title or description
//         if(search_string) {
//             ad_list = await prisma.ads.findMany({
//                 where: {
//                     OR: [
//                         { title: { 
//                             contains: String(search_string),
//                             mode: 'insensitive' 
//                         } },
//                         { description: { 
//                             contains: String(search_string),
//                             mode: 'insensitive'
//                          } },
//                     ]
//                 },
//                 select: {
//                     id: true,
//                     op_username: true,
//                     category_name: true,
//                     title: true,
//                     price: true,
//                     is_negotiable: true,
//                     is_used: true,
//                     promotion_type: true,
//                     createdAt: true,
//                 }
//             });
//         }

//         // else, fetch all ads
//         else{
//             ad_list = await prisma.ads.findMany({
//                 select: {
//                     id: true,
//                     op_username: true,
//                     category_name: true,
//                     title: true,
//                     price: true,
//                     is_negotiable: true,
//                     is_used: true,
//                     promotion_type: true,
//                     createdAt: true,
//                 }
//             });
//         }
        
//         return res.json(ad_list);
//     } catch (error: any) {
//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// }



// get ad details: /api/ads/:adId
let get_ad_details = async (req:Request, res:Response) => {
    try {
        let ad_details = await prisma.ads.findUnique({
            where: { id: Number(req.params.adId) },
            select: {
                id: true,
                op_username: true,
                category_name: true,
                title: true,
                description: true,
                price: true,
                is_negotiable: true,
                is_used: true,
                is_phone_public: true,
                days_used: true,
                address: true,
                promotion_type: true,
                createdAt: true,
            }
        });

        
        // ad not found
        if (!ad_details) {
            return res.status(404).json({
                success: false,
                error: 'Ad not found!'
            });
        }
    
        
        // calculate usage time(years, months, days) from days_used
        let usage_time = {
            years: Math.floor(ad_details.days_used / 365),
            months: Math.floor((ad_details.days_used % 365) / 30),
            days: Math.floor((ad_details.days_used % 365) % 30),
        }

        
        // if is_phone_public is true, fetch phone number from user table
        let phone = '';
        if (ad_details.is_phone_public) {
            const user = await prisma.users.findUnique({
                where: { username: ad_details.op_username },
                select: { phone: true }
            });
            phone = user.phone;
        }


        // remove days_used from ad_details
        delete ad_details.days_used;

        // add usage_time and phone to ad_details
        const ad_details_json = {
            ...ad_details,
            usage_time: usage_time,
            phone: phone
        }
        

        
        return res.json(ad_details_json);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


export { postAd, get_ads, get_ad_details }