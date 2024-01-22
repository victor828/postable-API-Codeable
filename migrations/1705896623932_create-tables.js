require("dotenv").config();

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    username: { type: "varchar(50)", notNull: true, unique: true },
    password: { type: "varchar(255)", notNull: true },
    email: { type: "varchar(100)", unique: true },
    firstName: { type: "varchar(50)" },
    lastName: { type: "varchar(50)" },
    role: {
      type: "varchar(10)",
      notNull: true,
      default: "user",
      check: "role IN ('user', 'admin')",
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("posts", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "cascade",
    },
    content: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("likes", {
    id: "id",
    postId: {
      type: "integer",
      notNull: true,
      references: "posts",
      onDelete: "cascade",
    },
    userId: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "cascade",
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    constraints: {
      unique: ["postId", "userId"],
    },
  });

  pgm.createIndex("posts", "userId");

  pgm.createIndex("likes", "postId");
  pgm.createIndex("likes", "userId");

};
