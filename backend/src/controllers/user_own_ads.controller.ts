import { Request, Response } from "express";

// import prisma client
import prisma from "../../prisma/prisma_client";

// get user own ads: /api/profile/my_ads
let get_user_own_ads = async (req: Request, res: Response) => {};

export { get_user_own_ads };
