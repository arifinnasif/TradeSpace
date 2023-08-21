import { Request, Response } from "express";

// import prisma client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*

1. get all categories: api/home/categories

*/

let get_categories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        name: true,
      },
    });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: "categories not found" });
  }
};

let get_categories_with_ads_count = async (req: Request, res: Response) => {
  //get the category list first
  try {
    const categories = await prisma.category.findMany({
      select: {
        name: true,
      },
    });
    // get the count of ads in each category
    let categories_with_ads_count = [];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const ads_count = await prisma.ads.count({
        where: {
          category_name: category.name,
        },
      });
      categories_with_ads_count.push({
        name: category.name,
        ads_count,
      });
    }
    res.json({ categories_with_ads_count });
  } catch (error) {
    res.status(500).json({ error: "categories not found" });
  }
};

export { get_categories, get_categories_with_ads_count };
