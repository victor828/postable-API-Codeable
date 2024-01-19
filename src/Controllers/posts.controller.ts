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

  async create(req: Request, res: Response) {
    const data = req.body;
    const post = await service_Post.createPost(data);
    return post.ok ? res.status(201).json(post) : res.status(400).json(post);
  }

  async getByUser(req: Request, res: Response) {
    const user = req.params["username"];
    const data = await service_Post.getPostByUser(user);
    return data.ok ? res.status(200).json(data) : res.status(400).json(data);
  }
}

export const controller_Post = new Posts();