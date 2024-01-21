/** @format */

import express from "express";
import { controller_Post } from "../Controllers/posts.controller";
import { authenticateHandler } from "../midelware/authentication.mdw";
import { authorize } from "../midelware/authorization.mdw";
import { posts, schemaValidation } from "../Schema/schemas";
export const routePosts = express.Router();

routePosts.get("/", controller_Post.getAll);

routePosts.get("/:username", controller_Post.getByUser);

routePosts.post(
  "/posts",
  authenticateHandler,
  authorize("admin", "users"),
  schemaValidation(posts),
  controller_Post.create
);

routePosts.patch(
  "/posts/:id",
  authenticateHandler,
  authorize("admin", "users"),
  schemaValidation(posts),
  controller_Post.update
);
