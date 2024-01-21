/** @format */

import express from "express";
import { controller_Users } from "../Controllers/users.controller";
import { schemaValidation, userLogin, users } from "../Schema/schemas";

export const routeUser = express.Router();

// routeUser.get("/", controller_Users.getAll);
routeUser.get("/me");
routeUser.post("/login", schemaValidation(userLogin), controller_Users.login);
routeUser.post("/signup", schemaValidation(users), controller_Users.register);
routeUser.get("/");
