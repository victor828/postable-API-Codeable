import { pool } from "../Db/db";

class Likes {
  async newLike(id: string) {
    const consult = `insert into likes (iduser, id_post) values($1,$2) returning *`;
    const response = await pool.query(consult, [1, id]);
    return consult;
  }
  async deleteLike() {
    const consult = `delete from likes where id_user = $1 and id_post = $2 returning *`;
  }
}
