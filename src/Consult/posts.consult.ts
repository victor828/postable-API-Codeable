import { pool } from "../Db/db";
import { PostsModel, postModel } from "../Models/posts.model";
// console.log(`---> consultas: ${result}`);
class Posts {
  async getPosts() {
    // const consult = `SELECT * FROM posts ORDER BY createdat`;
    const consult = `SELECT p.*, u.username, COUNT(l.id) AS likesCount
FROM posts AS p
LEFT JOIN users AS u ON p.userid = u.id
LEFT JOIN likes AS l ON l.postid = p.id
GROUP BY p.id, u.username`;
    try {
      const result = await pool.query(consult);
      return result.rows;
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "error :" + error,
      };
    }
  }

  async getPostUserId(id: string) {
    const consult = `SELECT p.*, u.username, COUNT(l.id) AS likesCount
FROM posts AS p
LEFT JOIN users AS u ON p.userid = u.id
LEFT JOIN likes AS l ON l.postid = p.id
WHERE p.userid = $1
GROUP BY p.id, u.username`;
    try {
      const result = await pool.query(consult, [id]);
      return result.rows;
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "error :" + error,
      };
    }
  }

  async getPostId(id: string) {
    console.log(`---> consultas: ${id}`);
    // const consult = `SELECT * FROM posts WHERE id = $1`;
    const consult = `SELECT p.*, u.username, COUNT(l.id) AS likesCount
FROM posts AS p
LEFT JOIN users AS u ON p.userid = u.id
LEFT JOIN likes AS l ON l.postid = p.id
GROUP BY p.id, u.username
WHERE p.id = $1`;
    try {
      const result = await pool.query(consult, [id]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "error :" + error,
      };
    }
  }

  async getPostByUser(user: string) {
    const consult = `SELECT p.*, u.username, COUNT(l.id) AS likesCount
      FROM posts AS p
      LEFT JOIN users AS u ON p.userid = u.id
      LEFT JOIN likes AS l ON l.postid = p.id
      GROUP BY p.id, u.username
      WHERE u.username = $1`;
    try {
      const result = await pool.query(consult, [user]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "error :" + error,
      };
    }
  }

  async createPost(data: postModel, userId: string) {
    const consult = `INSERT INTO posts (userId, content)
      VALUES ($1, $2) RETURNING *`;
    try {
      const result = await pool.query(consult, [userId, data.content]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "error :" + error,
      };
    }
  }

  async updatePost(data: PostsModel, id: string) {
    const consult = `UPDATE posts SET content = $1 , updatedat = NOW() WHERE id = $2 RETURNING *`;
    try {
      const result = await pool.query(consult, [data.content, id]);
      console.log(`---> consultas: ${JSON.stringify(result.rows[0])}`);
      return result.rows;
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
      throw error;
    }
  }

  async deletePost(data: PostsModel) {
    const consult = `DELETE FROM posts WHERE id = $1`;
    try {
      const result = await pool.query(consult, [data.id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
      throw error;
    }
  }
}

export const consult_Posts = new Posts();
