/** @format */

import { consult_Likes } from "../Consult/likes.consult";
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

  async getUser(user_id: string) {
    const response = await consults_Users.getUser(user_id);
    return response
      ? { ok: true, data: response }
      : { ok: false, message: "usuario no existe" };
  }

  async deleteUser(id_user: string) {
    const userExist = await consults_Users.getUser(id_user);
    if (userExist) return { ok: false, message: "usuario no existe" };
    //* deberia eliminar todos los post que tienen su id ya que  las tablas estan vinculdas con foreign key
    await consult_Posts.deletePostOfUser(id_user);
    // TODO: tambien tenemos que eliminar los likes vinculdas
    await consult_Likes.deleteLikes(id_user);
    await consults_Users.deleteUser(id_user);
    return { ok: true, message: "cuenta eliminada" };
  }

  async updateUser(user_id: string, dataUser: user) {
    const userExist = await consults_Users.getUserByName(dataUser.username);
    if (userExist) return { ok: false, message: "nombre de usuario ya existe" };

    const response = await consults_Users.updateUser(dataUser, user_id);
    return response
      ? { ok: true, data: response }
      : { ok: false, data: response };
  }

  async getpostByUser(user: string) {
    const { id } = await consults_Users.getUserByName(user);
    if (!id) return { ok: false, data: "No existe el usuario" };
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
