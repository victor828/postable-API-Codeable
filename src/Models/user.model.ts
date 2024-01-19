/** @format */

export type PostsModel = {
  id: string;
  userId: string;
  content: string;
  createAt: string;
  updateAt: string;
};

export type postModel = Omit<PostsModel, "id">;
