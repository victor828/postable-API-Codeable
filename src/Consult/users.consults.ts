/** @format */

import { pool } from "../Db/db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { user } from "../Models/users.models";

const jwtSecret = "5uper53cr3t";
// process.env["SECRET"]

class UsersConsults {
  async allUsers() {
    const consult = `SELECT * FROM users order by id`;
    try {
      const result = await pool.query(consult);
      return result.rows;
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error: " + error,
      };
    }
  }
  async getUser(user_id: string) {
    const consult = `SELECT * FROM users WHERE id = $1`;
    try {
      const result = await pool.query(consult, [user_id]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error: " + error,
      };
    }
  }
  async getUserByName(user: string) {
    const consult = `SELECT * FROM users WHERE username = $1`;
    try {
      const result = await pool.query(consult, [user]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error: " + error,
      };
    }
  }

  async registerUser(data: user) {
    console.log("----> Estamos en register consult : " + JSON.stringify(data));

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const consult = `INSERT INTO users(
      username,
      password,
      role,
      email,
      firstname,
      lastname
      )
    VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
    const values = [
      data.username,
      hashedPassword,
      (data.role = "user"),
      data.email,
      data.firstname,
      data.lastname,
    ];
    try {
      const res = await pool.query(consult, values);
      console.log(
        "----> Estamos en register consult 2 : " + JSON.stringify(res.rows)
      );

      return res.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: " (❁´◡`❁) ---> " + error,
      };
    }
  }

  async updateUser(data: user, id: string) {
    const consult = `UPDATE users SET 
    username = $1,
    password = $2,
    email = $3,
    firstname = $4,
    lastname = $5,
    role = $6
    WHERE id = $7 RETURNING *`;
    const values = [
      data.username,
      data.password,
      data.email,
      data.firstname,
      data.lastname,
      data.role,
      id,
    ];
    try {
      const res = await pool.query(consult, values);
      return res.rows;
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error",
      };
    }
  }

  async deleteUser(id: string) {
    try {
      const consult = `DELETE FROM users WHERE id = $1`;
      return await pool.query(consult, [id]);
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error",
      };
    }
  }

  //! logeo

  async login(data: user) {
    const userFromBb = await this.getUserByName(data.username);
    const checkPassword = await bcrypt.compare(
      data.password,
      userFromBb.password
    );

    // console.log("usuario de DB: ", userFromBb);
    // console.log("ID ", userFromBb.id);

    const payload = {
      userId: userFromBb.id,
      userRole: userFromBb.role,
    };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "20m" });

    if (checkPassword) {
      const data = {
        ok: true,
        user: userFromBb,
        token: token,
      };
      return data;
    } else {
      return {
        ok: false,
        message: "Error",
      };
    }
  }
}

export const consults_Users = new UsersConsults();
