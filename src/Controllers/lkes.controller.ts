import { Request, Response } from "express";
import { service_Likes } from "../Services/likes.service";

class Likes {
  async newLike(req: Request, res: Response) {
    const id = req.params["postId"];
    console.log("este es el param " + id);

    // const { userId } = req.body;
    // const post = await service_Likes.newLike(id, userId);
    const post = await service_Likes.newLike(id);
    post.ok ? res.status(201).json(post) : res.status(400).json(post);
  }

  async deleteLike(req: Request, res: Response) {
    const id = req.params["postId"];
    // const { userId } = req.body;
    // const post = await service_Likes.deleteLike(id, userId);
    const post = await service_Likes.deleteLike(id);
    post.ok ? res.status(201).json(post) : res.status(400).json(post);
  }
}
export const controller_Likes = new Likes();
