import { pool } from "../Db/db";
import { PostsModel, postModel } from "../Models/posts.model";
// console.log(`---> consultas: ${result}`);

class Posts {
  async getPosts() {
    const consult = `SELECT * FROM posts`;
    const result = await pool.query(consult);
    return result.rows;
  }

  async getPostId(id: string) {
    const consult = `SELECT * FROM posts WHERE userid = $1`;
    const result = await pool.query(consult, [id]);
    return result.rows;
  }

  async getPostByUser(user: string) {
    const consult = `SELECT * FROM posts WHERE username = $1`;
    const result = await pool.query(consult, [user]);
    return result.rows[0];
  }

  async createPost(data: postModel) {
    const consult = `INSERT INTO posts (userId, content)
    VALUES (1, $1) RETURNING *`;
    // ! el valor 1 corresponde al usurio logueado
    // TODO: sera cambiado mas adelante por la optencion del id correto
    const result = await pool.query(consult, [
      //   data.userId,
      data.content,
    ]);
    return result.rows[0];
  }

  async updatePost(data: PostsModel, id: string) {
    const consult = `UPDATE posts SET content = $1 , updatedat = NOW() WHERE id = $2 RETURNING *`;
    const result = await pool.query(consult, [data.content, id]);
    console.log(`---> consultas: ${JSON.stringify(result.rows[0])}`);

    return result.rows[0];
  }

  async deletePost(data: PostsModel) {
    const consult = `DELETE FROM posts WHERE id = $1`;
    const result = await pool.query(consult, [data.id]);
    return result.rows[0];
  }
}

export const consult_Posts = new Posts();
