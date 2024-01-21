import { controller_Likes } from "../Controllers/lkes.controller";
import { authenticateHandler } from "../midelware/authentication.mdw";
import { authorize } from "../midelware/authorization.mdw";

const express = require("express");
export const likesRouter = express.Router();

likesRouter.post(
  "/posts/:postId/like",
  authenticateHandler,
  authorize("admin", "users"),
  controller_Likes.newLike
);

likesRouter.delete(
  "/posts/:postId/like",
  authenticateHandler,
  authorize("admin", "users"),
  controller_Likes.deleteLike
);
