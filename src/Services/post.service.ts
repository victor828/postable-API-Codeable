import { consult_Posts } from "../Consult/posts.consult";
import { consults_Users } from "../Consult/users.consults";
import { PostsModel } from "../Models/posts.model";
// console.log(`---> service: ${id}`);

class Posts {
  async getAll() {
    const posts = await consult_Posts.getPosts();
    return posts
      ? { ok: true, message: "Posts found", data: posts }
      : { ok: false, message: "Posts not found", data: null };
  }

  async getByUser(user: string) {
    const { id } = await consults_Users.getUserByName(user); //! <--- no sera necesario una vez tengamos la autentificacion neesitamos crear una variable con el id del user
    const response = await consult_Posts.getPostId(id);
    return response
      ? { ok: true, data: response }
      : { ok: false, data: response };
  }

  async createPost(post: PostsModel) {
    //! Aqui ya tenemos que tener la autentificaion para sar el id -> dentro de create estamos pasando 1 manualmente
    const newPost = await consult_Posts.createPost(post);
    return newPost
      ? { ok: true, message: "Post created", data: newPost }
      : { ok: false, message: "Post not created", data: null };
  }

  async update(data: PostsModel, id: string) {
    const updatedPost = await consult_Posts.updatePost(data, id);
    return updatedPost
      ? { ok: true, message: "Post created", data: updatedPost }
      : { ok: false, message: "Post not created", data: updatedPost };
  }

  //   async deletePost(id) {
  //     const deletedPost = await consult_Posts.deletePost(id);
  //     return deletedPost;
  //   }
}

export const service_Post = new Posts();
