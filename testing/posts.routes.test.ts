// const { describe, expect, mockRequest, mockResponse } = require("node:test");
// import { routePosts } from "../src/Routes/posts.routes";
// import { test } from "vitest";


// describe("routePosts.get", () => {
//   test("should return a 200 status code", async () => {
//     const req = mockRequest();
//     const res = mockResponse();

//     routePosts.get(req, res);

//     expect(res.status).toBe(200);
//   });

//   test("should return a list of posts", async () => {
//     const req = mockRequest();
//     const res = mockResponse();

//     routePosts.get(req, res);

//     expect(res.json).toBeDefined();
//     expect(res.json.length).toBeGreaterThan(0);
//   });
// });
