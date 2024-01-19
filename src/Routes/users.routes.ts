import express from "express";
import { controller_Users } from "../Controllers/users.controller";

export const routeUser = express.Router();

routeUser.get("/", controller_Users.getAll);
routeUser.get("/");
routeUser.get("/");
routeUser.get("/");
routeUser.get("/");
