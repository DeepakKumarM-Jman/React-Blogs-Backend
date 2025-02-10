import { Router } from "express";
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  getPopularBlogs,
} from "../controllers/blog.controller.js";
import authorize from "../middleware/auth.middleware.js";

const blogRouter = Router();

blogRouter.get("/popular", getPopularBlogs);

blogRouter.get("/", getBlogs);

blogRouter.get("/:id", getBlog);

blogRouter.post("/", authorize, createBlog);

blogRouter.put("/:id", authorize, updateBlog);

blogRouter.delete("/:id", authorize, deleteBlog);

blogRouter.post("/:id/comment", authorize, addComment);

export default blogRouter;
