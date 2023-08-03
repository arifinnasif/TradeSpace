import { Request, Response } from 'express';

let postAd = async (req: Request, res: Response) => {
    const user: any = req.user;
    console.log("Post AD request from " + user.username);
}

export { postAd }