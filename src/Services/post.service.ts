/** @format */

import { consult_Posts } from "../Consult/posts.consult";
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
    const post = await consult_Posts.getPost(user);
    return post
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
