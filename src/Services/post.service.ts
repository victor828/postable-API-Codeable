/** @format */

import { consult_Posts } from "../Consult/posts.consult";
import { users_Consults } from "../Consult/users.consults";
import { PostsModel } from "../Models/posts.model";

class Posts {
  async getAll() {
    const posts = await consult_Posts.getPosts();
    return posts
      ? { ok: true, message: "Posts found", data: posts }
      : { ok: false, message: "Posts not found", data: null };
  }
  async getPost(id: string) {
    const post = await consult_Posts.getPost(id);
    return post
      ? { ok: true, message: "Post found", data: post }
      : { ok: false, message: "Post not found", data: null };
  }

  async getPostByUser(user: string) {
    /* 
    1- verificar que el usuario existe
    2- si existe tomamos si id
    3- tomamos todos lo spost que le pertenescan al post
    */
    const userExist = users_Consults.getUserByName(user);
    console.log(`service user ${userExist}`);
    if (!userExist) return { ok: false, message: "El usuario no existe" };

    // const post = await consult_Posts.getPost(userExist.id);
    // return post
    return userExist
      ? { ok: true, message: "Posts found", data: post }
      : { ok: false, message: "Posts not found", data: null };
  }

  async createPost(post: PostsModel) {
    const newPost = await consult_Posts.createPost(post);
    return newPost
      ? { ok: true, message: "Post created", data: newPost }
      : { ok: false, message: "Post not created", data: null };
  }

  //   async updatePost(id, post) {
  //     const updatedPost = await consult_Posts.updatePost(id, post);
  //     return updatedPost;
  //   }

  //   async deletePost(id) {
  //     const deletedPost = await consult_Posts.deletePost(id);
  //     return deletedPost;
  //   }
}

export const service_Post = new Posts();
