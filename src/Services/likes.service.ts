import { consult_Likes } from "../Consult/likes.consult";
import { consult_Posts } from "../Consult/posts.consult";

class Likes {
  //   async newLike(id_post: string, id_user: string) {
  async newLike(id_post: string) {
    // verificacion si el post existe
    const post = await consult_Posts.getPostId(id_post);
    // si existe podemos crear el nuevo like
    if (!post) return { ok: false, message: "Post not exist", data: null };
    // const like = await consult_Likes.newLike(id_post, id_user);
    const like = await consult_Likes.newLike(id_post);
    const postR = await consult_Posts.getPostId(id_post);
    return like ? { ok: true, data: postR } : { ok: false, data: postR };
  }

  //   async deleteLike(id_post: string, id_user: string) {
  async deleteLike(id_post: string) {
    const result = await consult_Posts.getPostId(id_post);
    console.log(`> ---> getPostId: ${JSON.stringify(result)}`);
    if (!result) return { ok: false, message: "Post not exist", data: null };
    // const like = await consult_Likes.deleteLike(id_post, id_user);
    await consult_Likes.deleteLike(id_post);
    const resultR = await consult_Posts.getPostId(id_post);
    console.log(`> ---> service: ${JSON.stringify(resultR)}`);
    return result
      ? { ok: true, data: resultR }
      : { ok: false, message: "Like not exist" };
  }
}

export const service_Likes = new Likes();
