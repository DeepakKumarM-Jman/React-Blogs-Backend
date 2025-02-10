import { Router } from "express";
import { deleteUser, getFavorites, getUser, getUsers, likeBlog, updateUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

// userRouter.post("/", (req, res) => res.send({ message: "create new user" }));
userRouter.post("/like/:blogId", authorize, likeBlog);

userRouter.get("/favorites", authorize, getFavorites);

userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id", authorize, updateUser);

userRouter.delete("/:id", authorize, deleteUser);

export default userRouter;