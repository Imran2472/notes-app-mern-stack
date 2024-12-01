import User from "../Models/User.Model.js";
import bcrypt from "bcrypt";
import fs from "fs";
import cloudinary from "../Utils/Cloudinary.js";
import jwt from "jsonwebtoken";
export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file.path;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    if (!image) {
      return res.json({
        success: false,
        message: "Please upload a profile picture",
      });
    } else {
      const imageSrc = await cloudinary.uploader.upload(image);
      fs.unlinkSync(image);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
        profile: imageSrc.secure_url,
      });
      await newUser.save();
      res.json({
        success: true,
        message: "User registered successfully",
        newUser,
      });
    }
  } catch (error) {
    console.error("Error in SignUp", error);
    res.json({ message: error.message });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (!email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign({ userId: user._id }, "!@#$%^&*()_+}{:?><?/}", {
      expiresIn: "48h",
    });
    res.json({ success: true, token, message: "Logged in successfully", user });
  } catch (error) {
    console.error("Error in Login", error);
    res.json({ message: error.message });
  }
};

export const Profile = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    });
  } catch (error) {
    console.error("Error in Profile", error);
    res.json({ message: error.message });
  }
};
