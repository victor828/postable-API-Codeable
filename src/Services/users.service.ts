import { consult_Posts } from "../Consult/posts.consult";
import { consults_Users } from "../Consult/users.consults";

class Users {
  async getAll() {
    const response = await consults_Users.allUsers();
    return response
      ? { ok: true, data: response }
      : { ok: false, data: response };
  }
  async getpostByUser(user: string) {
    // consulto el usuario y su info
    const { id } = await consults_Users.getUserByName(user);
    //tomo la la informacion del usuario y uso su id
    // consulto los post del usuario
    const response = await consult_Posts.getPostId(id);
    return response
      ? { ok: true, data: response }
      : { ok: false, data: response };
  }
}

export const service_Users = new Users();
