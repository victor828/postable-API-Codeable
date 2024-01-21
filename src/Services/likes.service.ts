import { consult_Likes } from "../Consult/likes.consult";
import { consult_Posts } from "../Consult/posts.consult";

class Likes {
  async newLike(id_post: string, id_user: string) {
    const post = await consult_Posts.getPostId(id_post);
    if (!post) return { ok: false, message: "Post not exist", data: null };
    const like = await consult_Likes.newLike(id_post, id_user);
    const postR = await consult_Posts.getPostId(id_post);
    return like ? { ok: true, data: postR } : { ok: false, data: postR };
  }

  async deleteLike(id_post: string, id_user: string) {
    const result = await consult_Posts.getPostId(id_post);
    if (!result) return { ok: false, message: "Post not exist", data: null };
    await consult_Likes.deleteLike(id_post, id_user);
    const resultR = await consult_Posts.getPostId(id_post);
    return result
      ? { ok: true, data: resultR }
      : { ok: false, message: "Like not exist" };
  }
}

export const service_Likes = new Likes();
