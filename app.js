import express from "express";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blog.routes.js";
import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Blogs API!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});
