/** @format */

import { pool } from "../Db/db";
import { post } from "../Models/user.model";

class Posts {
  async getPosts() {
    const consult = `SELECT * FROM posts`;
    const result = await pool.query(consult);
    return result.rows;
  }

  async getPost(id: string) {
    const consult = `SELECT * FROM posts WHERE id = $1`;
    const result = await pool.query(consult, [id]);
    return result.rows[0];
  }

  async createPost(data: post) {
    const consult = `INSERT INTO posts (userId, content) VALUES ($1, $2)`;
    const result = await pool.query(consult, [data.userId, data.content]);
    return result.rows[0];
  }
    
    
}

export const consult_Posts = new Posts();
