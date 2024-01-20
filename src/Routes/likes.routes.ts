import { controller_Likes } from "../Controllers/lkes.controller";

const express = require("express");
export const likesRouter = express.Router();

likesRouter.post("/posts/:postId/like", controller_Likes.newLike);
likesRouter.delete("/posts/:postId/like", controller_Likes.deleteLike);
