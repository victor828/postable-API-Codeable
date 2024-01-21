import { controller_Likes } from "../Controllers/lkes.controller";
import { authenticateHandler } from "../midelware/authentication.mdw";
import { authorize } from "../midelware/authorization.mdw";

const express = require("express");
export const likesRouter = express.Router();

//* dar like
likesRouter.post(
  "/posts/:postId/like",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Likes.newLike
);

//* eliminar like
likesRouter.delete(
  "/posts/:postId/like",
  authenticateHandler,
  authorize("admin", "user"),
  controller_Likes.deleteLike
);
