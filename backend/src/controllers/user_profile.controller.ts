import { Request, Response } from "express";

// import prisma client
import prisma from "../../prisma/prisma_client";

// interface for user profile
interface UserProfile {
  username: string;
  name: string;
  email: string;
  phone: string;
  dob: Date;
  gender: string;
  profile_pic: string;
  created_at: Date;
  posted_ads_count: number;
  pending_ads_count: number;
  active_ads_count: number;
  declined_ads_count: number;
}

// get user profile: /api/profile
let get_user_profile = async (req: Request, res: Response) => {
  const user: any = req.user;

  // retrieve user profile from db
  try {
    const userProfilefromDB = await prisma.users.findUnique({
      where: { username: user.username },
      select: {
        username: true,
        name: true,
        email: true,
        phone: true,
        dob: true,
        gender: true,
        profile_pic: true,
        created_at: true,
      },
    });

    let ads_in_adsTable = await prisma.ads.count({
      where: { op_username: user.username },
    });

    let declined_ads_count = await prisma.archived_ads.count({
      where: { op_username: user.username },
    });

    let posted_ads_count = ads_in_adsTable + declined_ads_count;

    let pending_ads_count = await prisma.ads.count({
      where: { op_username: user.username, status: "pending" },
    });

    let active_ads_count = ads_in_adsTable - pending_ads_count;

    // create user profile object
    const userProfile: UserProfile = {
      username: userProfilefromDB?.username,
      name: userProfilefromDB?.name,
      email: userProfilefromDB?.email,
      phone: userProfilefromDB?.phone,
      dob: userProfilefromDB?.dob,
      gender: userProfilefromDB?.gender,
      profile_pic: userProfilefromDB?.profile_pic,
      created_at: userProfilefromDB?.created_at,
      posted_ads_count: posted_ads_count,
      pending_ads_count: pending_ads_count,
      active_ads_count: active_ads_count,
      declined_ads_count: declined_ads_count,
    };

    // user not found
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        error: "User not found!",
      });
    }

    // console.log(userProfile);

    // return user profile
    return res.status(200).json(userProfile);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// update user profile: /api/profile
let update_user_profile = async (req: Request, res: Response) => {
  const user: any = req.user;

  // update user profile in db [field: name, phone, dob]
  try {
    const updatedUserProfile = await prisma.users.update({
      where: { username: user.username },
      data: {
        name: req.body.name,
        phone: req.body.phone,
        dob: new Date(req.body.dob),
      },
    });

    // user not found
    if (!updatedUserProfile) {
      return res.status(404).json({
        success: false,
        error: "User not found!",
      });
    }

    // return user profile
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

let get_user_own_ads = async (req: Request, res: Response) => {
  const user: any = req.user;

  // retrieve user profile from db
  try {
    const userAdsList = await prisma.ads.findMany({
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
        is_phone_public: true,
        address: true,
        latitude: true,
        longitude: true,
        promotion_type: true,
        status: true,
        created_at: true,
      },
    });

    // send user profile
    res.status(200).json(userAdsList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { get_user_profile, update_user_profile, get_user_own_ads };
