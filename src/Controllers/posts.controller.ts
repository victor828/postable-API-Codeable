/** @format */

import { Request, Response } from "express";
import { service_Post } from "../Services/post.service";

class Posts {
  async getAll(req: Request, res: Response) {
    try {
      const posts = await service_Post.getAll();
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
    }
  }

  //   async getOne(req: Request, res: Response) {
  //     const { id } = req.params;
  //     const post = await service_Post.getOne(id);
  //     res.status(200).json(post);
  //   }

  //   async create(req: Request, res: Response) {
  //     const { title, body } = req.body;
  //     const post = await service_Post.create(title, body);
  //     res.status(201).json(post);
  //   }
}

export const controller_Post = new Posts();
