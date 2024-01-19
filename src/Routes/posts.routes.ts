/** @format */

import express from "express";

import { controller_Post } from "../Controllers/posts.controller";

export const routePosts = express.Router();

routePosts.get("/", controller_Post.getAll);
