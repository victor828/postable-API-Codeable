/** @format */

import express from "express";
import { controller_Post } from "../Controllers/posts.controller";
import { authenticateHandler } from "../midelware/authentication.mdw";
import { authorize } from "../midelware/authorization.mdw";
import { posts, schemaValidation } from "../Schema/schemas";
export const routePosts = express.Router();

//* obtener todos los posts
routePosts.get("/", controller_Post.getAll);

//* obtener los posts de un usuario
routePosts.get("/:username", controller_Post.getByUser);

//* crear un post
routePosts.post(
  "/posts",
  authenticateHandler,
  authorize("admin", "user"),
  schemaValidation(posts),
  controller_Post.create
);

//* actualizar post
routePosts.patch(
  "/posts/:id",
  authenticateHandler,
  authorize("admin", "user"),
  schemaValidation(posts),
  controller_Post.update
);

//* Delete the post
routePosts.delete(
  "/posts/:id",
  authenticateHandler,
  authorize("admin"),
  controller_Post.delete
);