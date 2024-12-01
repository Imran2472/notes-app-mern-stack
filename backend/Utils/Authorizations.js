import jwt from "jsonwebtoken";
import User from "../Models/User.Model.js";

export const Authorization = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECERATE);

    const id = decoded.userId;
    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.json({ message: "Invalid token" });
    console.log("Error while verifying token", error.message);
  }
};
