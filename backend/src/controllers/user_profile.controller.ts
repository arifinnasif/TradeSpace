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
}

// get user profile: /api/profile
let get_user_profile = async (req: Request, res: Response) => {
  const user: any = req.user;

  // retrieve user profile from db
  try {
    let userProfile = await prisma.users.findUnique({
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

    let postedAdsCount = await prisma.ads.count({
      where: { op_username: user.username },
    });

    let soldAdsCount = await prisma.archived_ads.count({
      where: { op_username: user.username },
    });

    // add posted ads count to user profile
    userProfile.posted_ads_count = postedAdsCount;

    // user not found
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        error: "User not found!",
      });
    }

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

export { get_user_profile, update_user_profile };
