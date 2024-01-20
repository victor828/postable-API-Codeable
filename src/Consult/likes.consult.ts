import { pool } from "../Db/db";

class Likes {
  async newLike(id: string) {
    const consult = `insert into likes (postid, userid) values($1,$2) returning *`;
    const response = await pool.query(consult, [id, 1]);
    console.log(`---> create like: ${JSON.stringify(response.rows)}`);

    return response.rows;
  }

  async deleteLike(id: string) {
    //   async deleteLike(id: string, userid: string) {
    const consult = `delete from likes where postid = $1 returning *`;
    const response = await pool.query(consult, [id]);
    console.log(`---> delete like: ${JSON.stringify(response.rows)}`);

    return response.rows;
  }

  async getLikes(id_post: string) {
    const consult = `select * from likes where postid = $1`;
    const response = await pool.query(consult, [id_post]);
    console.log(`---> get likes: ${JSON.stringify(response.rows)}`);

    return response.rows;
  }
}
export const consult_Likes = new Likes();
