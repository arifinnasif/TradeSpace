// @ts-nocheck
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export let get_all_things = async (req: Request, res: Response) => {
    // console.log("accessing all things");
    // const all_things = await prisma.stuffs.findMany();
    // res.json(all_things);
    const apples = [
        {
            type: 'Empire',
            price: '$1.20',
            quantityAvailable: 10,
        },
        {
            type: 'Granny Smith',
            price: '$0.85',
            quantityAvailable: 8,
        },
        {
            type: 'Gala',
            price: '$0.98',
            quantityAvailable: 4,
        },
        {
            type: 'Fuji',
            price: '$0.95',
            quantityAvailable: 3,
        },
        {
            type: 'Honeycrisp',
            price: '$1.50',
            quantityAvailable: 3,
        },
        {
            type: 'Golden Delicious',
            price: '$1.20',
            quantityAvailable: 2,
        },
        {
            type: 'Red Delicious',
            price: '$1.10',
            quantityAvailable: 11,
        },
    ];
    const { filterBy = [] } = req.query;
    console.log(Array.isArray(filterBy)); // true

    const filteredApples = apples.filter((apple) =>
        filterBy.includes(apple.type)
    );
    res.json(filteredApples);
}

export let get_a_thing = async (req: Request, res: Response) => {
    console.log("accessing thing with id: " + req.params.thingId);
    const target_id = Number(req.params.thingId);
    const thing = await prisma.stuffs.findUnique({
        where: { id: target_id },
    });
    console.log(thing);
    res.json(thing);
}

export let create_a_thing = async (req: Request, res: Response) => {
    console.log("creating thing with id: " + req.params.thingId);

    const new_thing = await prisma.stuffs.create({
        data: req.body
    });

    res.json(req.body);
}

export let update_a_thing = async (req: Request, res: Response) => {
    // console.log("updating thing with id: " + req.params.thingId);

    const target_id = Number(req.params.thingId);
    const new_name = req.body.name;
    const new_description = req.body.description;
    const new_price = Number(req.body.price);
    const new_image = req.body.image;

    const updated_thing = await prisma.stuffs.update({
        where: { id: target_id },
        data: {
            name: new_name,
            description: new_description,
            price: new_price,
            image: new_image
        }
    });


    res.json(updated_thing);
}

export let delete_a_thing = async (req: Request, res: Response) => {
    console.log("deleting thing with id: " + req.params.thingId);

    const target_id = Number(req.params.thingId);
    const deleted_thing = await prisma.stuffs.delete({
        where: { id: target_id },
    });

    res.json(deleted_thing);
}

// or we can simply export all the functions like this:
// export { get_a_thing, create_a_thing, update_a_thing, delete_a_thing };
