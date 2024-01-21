/** @format */

import { consult_Posts } from "../Consult/posts.consult";
import { consults_Users } from "../Consult/users.consults";
import { user } from "../Models/users.models";

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

  async login(dataUser: user) {
    const response = await consults_Users.login(dataUser);
    return response
      ? { ok: true, data: response }
      : { ok: false, data: response };
  }

  async regiser(dataUser: user) {
    const user = await consults_Users.getUserByName(dataUser.username);
    if (user)
      return { ok: false, message: `El usuario ya existe ${user.username}` };
    const registro = await consults_Users.registerUser(dataUser);
    console.log("----> Estamos en *** : " + JSON.stringify(registro));
    return registro.ok === false
      ? { ok: false, message: registro.message, data: registro }
      : registro
      ? { ok: true, message: `Se registro usuario con exito`, data: registro }
      : {
          ok: false,
          message: "no se pudo registrar el usuario",
          data: registro,
        };
  }
}

export const service_Users = new Users();
