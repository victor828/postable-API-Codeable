import { consult_Likes } from "../Consult/likes.consult";
import { consult_Posts } from "../Consult/posts.consult";
import { consults_Users } from "../Consult/users.consults";
import { PostsModel } from "../Models/posts.model";
// console.log(`---> service: ${id}`);

class Posts {
  async getAll(page: any, limit: any) {
    const posts = await consult_Posts.getPosts(page, limit);
    return posts
      ? { ok: true, message: "Posts found", data: posts }
      : { ok: false, message: "Posts not found", data: null };
  }

  async getByUser(user: string, page: any, limit: any) {
    const userExist = await consults_Users.getUserByName(user);
    const response = await consult_Posts.getPostUserId(
      userExist.id,
      page,
      limit
    );
    return response
      ? { ok: true, data: response, userName: userExist.userName }
      : { ok: false, data: response };
  }

  async createPost(post: PostsModel, userId: string) {
    const userExist = await consults_Users.getUser(userId);
    const newPost = await consult_Posts.createPost(post, userId);
    const likes = await consult_Likes.getLikes(newPost.id);
    newPost.username = userExist.username;
    newPost.likesCount = likes.length;
    return newPost ? { ok: true, data: newPost } : { ok: false, data: null };
  }

  async update(data: PostsModel, id: string, userId: string) {
    const exist = await consult_Posts.getPostId(id);
    if (!exist) return { ok: false, message: "Post not found", data: null };
    if (exist.userId !== userId)
      return { ok: false, message: "Unauthorized", data: null };
    const updatedPost = await consult_Posts.updatePost(data, id);
    const likes = await consult_Likes.getLikes(id);
    return updatedPost
      ? {
          ok: true,
          message: "Post updated",
          data: updatedPost,
          likesCount: likes.length,
        }
      : { ok: false, message: "Post not updated", data: updatedPost };
  }

  //   async deletePost(id) {
  //     const deletedPost = await consult_Posts.deletePost(id);
  //     return deletedPost;
  //   }
}

export const service_Post = new Posts();
