import { pool } from "../Db/db";

class Likes {
  async newLike(id: string, userid: string) {
    const consult = `insert into likes (postid, userid) values($1,$2) returning *`;
    try {
      const response = await pool.query(consult, [id, userid]);
      return response.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteLike(id: string, userid: string) {
    const consult = `DELETE FROM likes
      WHERE postid = $1 AND userid = $2
      RETURNING *;
      `;
    try {
      const response = await pool.query(consult, [id, userid]);
      return response.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteLikes(userid: string) {
    const consult = `DELETE FROM likes
      WHERE userid = $1
      RETURNING *;
      `;
    try {
      const response = await pool.query(consult, [userid]);
      return response.rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getLikes(id_post: string) {
    const consult = `select * from likes where postid = $1`;
    const response = await pool.query(consult, [id_post]);
    return response.rows;
  }
}
export const consult_Likes = new Likes();
