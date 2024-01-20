import { pool } from "../Db/db";
import { PostsModel, postModel } from "../Models/posts.model";
// console.log(`---> consultas: ${result}`);
class Posts {
  async getPosts() {
    // const consult = `SELECT * FROM posts ORDER BY createdat`;
       const consult = `SELECT p.*, Count(l.id) as likescount 
      FROM posts as p
      LEFT JOIN likes as l ON l.postid = p.id
      GROUP BY p.id;`;
    const result = await pool.query(consult);
    return result.rows;
  }
  // * funciona
  async getPostUserId(id: string) {
    // const consult = `SELECT * FROM posts WHERE userid = $1`;
    const consult = `SELECT p.*, Count(l.id) as likescount 
      FROM posts as p
      LEFT JOIN likes as l ON l.postid = p.id
      WHERE p.userid = $1
      GROUP BY p.id;`;
    const result = await pool.query(consult, [id]);
    // console.log(`---> consultas post ${JSON.stringify(result.rows)}`);
    return result.rows;
  }

  async getPostId(id: string): Promise<postModel> {
    console.log(`---> consultas: ${id}`);
    // const consult = `SELECT * FROM posts WHERE id = $1`;
    const consult = `SELECT p.*, Count(l.id) as likescount 
      FROM posts as p
      LEFT JOIN likes as l ON l.postid = p.id
      WHERE p.id = $1
      GROUP BY p.id;`;
    const result = await pool.query(consult, [id]);
    console.log(`---> consultas post ${JSON.stringify(result.rows[0])}`);
    return result.rows[0];
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
    // const consult = `UPDATE posts SET content = $1 , updatedat = NOW() WHERE id = $2 RETURNING *`;
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
    const result = await pool.query(consult, [data.id]);
    return result.rows[0];
  }
}

export const consult_Posts = new Posts();
