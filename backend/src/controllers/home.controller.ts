import { Request, Response } from "express";

// import prisma client
import prisma from "../../prisma/prisma_client";

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
          status: "approved",
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

let get_ads_by_category = async (req: Request, res: Response) => {
  try {
    const ads = await prisma.ads.findMany({
      where: {
        category_name: req.params.category_name,
        status: "approved",
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        image1: true,
        image2: true,
        image3: true,
        image4: true,
        image5: true,
        address: true,
        created_at: true,
        op_username: true,
        op: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({ ads });
  } catch (error) {
    res.status(500).json({ error: "ads not found" });
  }
};

export { get_categories, get_categories_with_ads_count, get_ads_by_category };
