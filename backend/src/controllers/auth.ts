const db = require('../db') 
import { Request, Response} from 'express';

export let getUsers = async (req:Request, res:Response) => {
    try {
        const userList = await db.query("SELECT * FROM users")
        console.log(userList)
    } catch (error) {
        console.log(error)
    }
}