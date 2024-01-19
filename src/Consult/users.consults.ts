import { pool } from "../Db/db";

class Users {
    async getUsers (){
    const consult = "SELECT * FROM users";
        const response  = await pool.query(consult)
        return response.rows
    }
    async getUserId (){
        const consult = "SELECT * FROM users WHERE id = $1";
        const response  = await pool.query(consult,[1])
        return response.rows
    }
}

export const consults_Users = new Users();

