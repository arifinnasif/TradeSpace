import { Request, Response, NextFunction } from 'express';

export let get_a_thing = async (req: Request, res: Response) => {
    await console.log("accessing thing with id: " + req.params.thingId); // await for db call
    res.json({ foo: "bar" });
}

export let create_a_thing = async (req: Request, res: Response) => {
    await console.log("creating thing with id: " + req.params.thingId);
    res.json(req.body);
}

export let update_a_thing = async (req: Request, res: Response) => {
    await console.log("updating thing with id: " + req.params.thingId);
    res.json({ foo: "bar" });
}

export let delete_a_thing = async (req: Request, res: Response) => {
    await console.log("deleting thing with id: " + req.params.thingId);
    res.json({ foo: "bar" });
}

// or we can simply export all the functions like this:
// export { get_a_thing, create_a_thing, update_a_thing, delete_a_thing };
