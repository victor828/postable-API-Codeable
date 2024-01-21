/** @format */

import { Request, Response } from "express";
import { service_Users } from "../Services/users.service";

class Users {
  async getAll(req: Request, res: Response) {
    const r = await service_Users.getAll();
    r.ok ? res.status(200).json({ r }) : res.status(400);
  }

  // async getUser(req: Request, res: Response) {
  //   const { username } = req.body;
  // }

  async login(req: Request, res: Response) {
    const dataUser = req.body;
    const response = await service_Users.login(dataUser);
    response.ok ? res.status(200).json({ response }) : res.status(400);
  }

  async register(req: Request, res: Response) {
    const dataUser = req.body;
    const response = await service_Users.regiser(dataUser);
    response.ok ? res.status(200).json({ response }) : res.status(400);
  }
}

export const controller_Users = new Users();
