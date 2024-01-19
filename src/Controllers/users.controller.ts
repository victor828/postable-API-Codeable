import { Request, Response } from "express";
import { service_Users } from "../Services/users.service";

class Users {
    async getAll (req: Request, res: Response){
        const r = await service_Users.getAll();
        r.ok ?  res.status(200).json({r}) : res.status(400);
        res.status(400).json(r);
    }
}

export const controller_Users = new Users();