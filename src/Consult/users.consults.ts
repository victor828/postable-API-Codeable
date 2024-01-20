/** @format */

import { pool } from "../Db/db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { User, user } from "../Models/users.models";

const jwtSecret = "5uper53cr3t";
// process.env["SECRET"]

class UsersConsults {
  async allUsers() {
    const consult = `SELECT * FROM users order by id`;
    const result = await pool.query(consult);
    return result.rows;
  }
  async getUser(user: User) {
    const consult = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(consult, [user.id]);
    return result.rows;
  }
  async getUserByName(user: string) {
    const consult = `SELECT * FROM users WHERE username = $1`;
    const result = await pool.query(consult, [user]);
    return result.rows[0];
  }

  async registerUser(data: user) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const consult = `INSERT INTO users(username, password,email, firstname, lastname, role)
    VALUES($1,$2,$3,$4,$5) RETURNING *`;
    const values = [
      data.userName,
      hashedPassword,
      data.email,
      data.firstName,
      data.lastName,
      data.role,
    ];
    const res = await pool.query(consult, values);
    console.log("Estamos en consulst 2: " + JSON.stringify(res.rows));

    return res.rows;
  }
  async updateUser(data: user, id: string) {
    const consult = `UPDATE users SET username = $1, password = $2, role = $3, email = $4, firstname = $5, lastname = $6 
    WHERE id = $7 RETURNING *`;
    const values = [
      data.userName,
      data.password,
      data.role,
      data.email,
      data.firstName,
      data.lastName,
      id,
    ];
    const res = await pool.query(consult, values);
    return res.rows;
  }
  async deleteUser(id: string) {
    const consult = `DELETE FROM users WHERE id = $1`;
    await pool.query(consult, [id]);
  }

  //! logeo

  async login(data: user) {
    const userFromBb = await this.getUserByName(data.userName);
    const checkPassword = await bcrypt.compare(
      data.password,
      userFromBb.password
    );

    console.log("usuario de DB: ", userFromBb);
    console.log("ID ", userFromBb.id);

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
