import express from "express";
import { routeUser } from "./Routes/users.routes";
import { routePosts } from "./Routes/posts.routes";
require("dotenv").config();

const app = express();
const PORT = process.env["PORT"];

app.use(express.json());
app.use("/users", routeUser);
app.use("", routePosts);

const server = app.listen(PORT, () => {
  const { port } = server.address() as any;
  console.log(`Escuchando al puerto ${port}`);
});
