/** @format */

import { pool } from "../Db/db";
import { PostsModel, postModel } from "../Models/user.model";

class Posts {
  async getPosts() {
    const consult = `SELECT * FROM posts ORDER BY createAt`;
    const result = await pool.query(consult);
    return result.rows;
  }

  async getPost(id: string) {
    const consult = `SELECT * FROM posts WHERE id = $1`;
    const result = await pool.query(consult, [id]);
    return result.rows[0];
  }

  async getPostByUser(user: string) {
    const consult = `SELECT * FROM posts WHERE username = $1`;
    const result = await pool.query(consult, [user]);
    return result.rows[0];
  }

  async createPost(data: postModel) {
    // TODO: agregar la fecha de creacion, crear una funcion que nos de la fecha del momento
    const consult = `INSERT INTO posts (userId, content, createAt, updateAt) VALUES ($1, $2)`;
    const result = await pool.query(consult, [data.userId, data.content]);
    return result.rows[0];
  }

    async updatePost(data: PostsModel) {
      // TODO: actualizar la fecha de modificacion
    const consult = `UPDATE posts SET content = $1 WHERE id = $2`;
    const result = await pool.query(consult, [data.content, data.id]);
    return result.rows[0];
  }

  async deletePost(data: PostsModel) {
    const consult = `DELETE FROM posts WHERE id = $1`;
    const result = await pool.query(consult, [data.id]);
    return result.rows[0];
  }
}

export const consult_Posts = new Posts();
