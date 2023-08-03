import { Request, Response } from 'express';

let postAd = async (req: Request, res: Response) => {
    const user: any = req.user;
    console.log("Post AD request from " + user.username);
    
    return res.status(200).json({
        success: true,
        message: 'Ad posted successfully!'
    });
}

export { postAd }