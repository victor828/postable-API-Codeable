/** @format */

export type User = {
  id: string;
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createAt: string;
  updateAt: string;
};

export type user = Omit<User, "id">;
