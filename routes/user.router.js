import { Router } from "express";
import { deleteUser, getFavorites, getUser, getUsers, likeBlog, updateUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

// userRouter.post("/", (req, res) => res.send({ message: "create new user" }));

userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id", authorize, updateUser);

userRouter.delete("/:id", authorize, deleteUser);

userRouter.get("/:id/favorites", authorize, getFavorites);

userRouter.post("/:id/like/:blogId", authorize, likeBlog);

export default userRouter;