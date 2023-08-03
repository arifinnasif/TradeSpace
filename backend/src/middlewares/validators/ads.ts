import { check } from 'express-validator';


// import prisma client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



// ------------------ Post AD Validation ------------------ //


// check if category exists
const category = check('category').custom(async (value: string) => {
    const category = await prisma.category.findUnique({
        where: { name: value },
    });

    if (!category) {
        throw new Error('Category does not exist.')
    }
})



export const postAdValidation = [category]