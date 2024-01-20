/** @format */

import express from "express";
import { controller_Users } from "../Controllers/users.controller";

export const routeUser = express.Router();

routeUser.get("/", controller_Users.getAll);
routeUser.get("/me");
routeUser.post("/login");
routeUser.post("/register", controller_Users.register);
routeUser.get("/");
