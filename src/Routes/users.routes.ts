/** @format */

import express from "express";
import { controller_Users } from "../Controllers/users.controller";
import {
  schemaValidation,
  // updateUsers,
  userLogin,
  users,
} from "../Schema/schemas";
import { authorize } from "../midelware/authorization.mdw";
import { authenticateHandler } from "../midelware/authentication.mdw";

export const routeUser = express.Router();

// routeUser.get("/", controller_Users.getAll);
//* Obtener la infromacion de l usuario logeado
routeUser.get(
  "/me",
  authenticateHandler,
  authorize("admin", "user"),
  controller_Users.getUser
);

//* Actualizar la infromacion de l usuario logeado
routeUser.patch(
  "/me",
  // schemaValidation(updateUsers),
  authenticateHandler,
  authorize("admin", "user"),
  controller_Users.updateUser
);

//* Eliminar la infromacion de l usuario logeado
routeUser.delete(
  "/me",
  authenticateHandler,
  authorize("admin", "user"),
  controller_Users.deleteUser
);

routeUser.post("/login", schemaValidation(userLogin), controller_Users.login);
routeUser.post("/signup", schemaValidation(users), controller_Users.register);
