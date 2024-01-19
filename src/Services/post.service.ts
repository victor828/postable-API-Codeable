/** @format */

import { consult_Posts } from "../Consult/posts.consult";

class Posts {
  async getAll() {
    const posts = await consult_Posts.getPosts();
    return posts;
  }
}

export const service_Post = new Posts();
