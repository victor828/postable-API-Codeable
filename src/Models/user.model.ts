/** @format */

export type Posts = {
  id: string;
  userId: string;
  content: string;
  createAt: string;
  updateAt: string;
};

export type post = Omit<Posts, "id">;
