import express from "express";
import { Login, Profile, SignUp } from "../Controllers/User.Controller.js";
import upload from "../Utils/upload.js";
import { Authorization } from "../Utils/Authorizations.js";
const router = express.Router();

router.post("/register", upload.single("profile"), SignUp);
router.post("/login", Login);
router.get("/profile", Authorization, Profile);

export default router;
