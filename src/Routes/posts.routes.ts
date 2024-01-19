/** @format */

import express from "express";

import { controller_Post } from "../Controllers/posts.controller";

export const routePosts = express.Router();

routePosts.get("/", controller_Post.getAll);
routePosts.get("/:username", controller_Post.getByUser);
routePosts.post("/posts", controller_Post.create);
// routePosts.put("/:id", controller_Post.update);
