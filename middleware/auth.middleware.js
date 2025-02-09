import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token not provided, Unauthorized" });
    }

    const decoded = await jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token, Unauthorized" });
    }

    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({ message: "User not found, Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authorize;