import { Pool } from "pg";
require("dotenv").config();

export const pool = new Pool({
  user: process.env["PGUSER"],
  host: "localhost",
  database: process.env["PGDATABASE"],
  password: process.env["PGPASSWORD"],
  port: 5432,
});


export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};

pool
  .connect()
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch((error: any) =>
    console.error(`Error de conexión a la base de datos: ${error}`)
  );
