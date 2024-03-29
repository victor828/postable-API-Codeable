import { pool } from "../Db/db";
import { PostsModel, postModel } from "../Models/posts.model";
// console.log(`---> consultas: ${result}`);
class Posts {
  async getPosts(page: any, limit: any) {
    // const consult = `SELECT * FROM posts ORDER BY createdat`;
    const consult = `SELECT p.*, u.username, COUNT(l.id) AS likesCount
      FROM posts AS p
      LEFT JOIN users AS u ON p.userid = u.id
      LEFT JOIN likes AS l ON l.postid = p.id
      GROUP BY p.id, u.username
      ORDER BY createdat
      LIMIT $1
      OFFSET $2`;
    try {
      const result = await pool.query(consult, [
        (limit = 10),
        (page = 0 * limit),
      ]);
      return result.rows;
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: "error :" + error,
      };
    }
  }

  async getPostUserId(id: string, page: any, limit: any) {
    const consult = `SELECT p.*, u.username, COUNT(l.id) AS likesCount
      FROM posts AS p
      LEFT JOIN users AS u ON p.userid = u.id
      LEFT JOIN likes AS l ON l.postid = p.id
      WHERE p.userid = $1
      GROUP BY p.id, u.username
      LIMIT $2
      OFFSET $3`;
    try {
      const result = await pool.query(consult, [
        id,
        (limit = 10),
        (page = 0 * limit),
      ]);
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
      WHERE p.id = $1
      GROUP BY p.id, u.username
      `;
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

  async getPostByUser(user: string, limit: any, page: any) {
    const consult = `SELECT p.*, u.username, COUNT(l.id) AS likesCount
      FROM posts AS p
      LEFT JOIN users AS u ON p.userid = u.id
      LEFT JOIN likes AS l ON l.postid = p.id
      WHERE u.username = $1
      GROUP BY p.id, u.username
      LIMIT $2
      OFFSET $3
      `;
    try {
      const result = await pool.query(consult, [
        user,
        (limit = 10),
        (page = 0 * limit),
      ]);
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

  async deletePost(id: string) {
    const consult = `DELETE FROM posts WHERE id = $1`;
    try {
      const result = await pool.query(consult, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
      throw error;
    }
  }

  async deletePostOfUser(user_id: string) {
    const consult = `DELETE FROM posts WHERE userid = $1`;
    try {
      const result = await pool.query(consult, [user_id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
      throw error;
    }
  }
}

export const consult_Posts = new Posts();
