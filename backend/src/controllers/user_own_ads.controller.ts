import { Request, Response } from "express";

// import prisma client
import prisma from "../../prisma/prisma_client";

// get user own ads: /api/profile/my_ads
let get_user_own_ads = async (req: Request, res: Response) => {
  const user: any = req.user;

  // retrieve user profile from db
  try {
    const userAds = await prisma.ads.findMany({
      where: { op_username: user.username },
      select: {
        id: true,
        title: true,
        description: true,
        category_name: true,
        price: true,
        is_negotiable: true,
        is_used: true,
        is_sell_ad: true,
        days_used: true,
        image1: true,
        // image2: true,
        // image3: true,
        // image4: true,
        // image5: true,
        // receipt_image: true,

        created_at: true,
      },
    });

    // send user profile
    res.status(200).json(userAds);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { get_user_own_ads };
