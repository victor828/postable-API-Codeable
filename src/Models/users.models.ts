/** @format */

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  createat: string;
  updateat: string;
};

export type user = Omit<User, "id">;
