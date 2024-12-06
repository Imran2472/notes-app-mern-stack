import express from "express";
import {
  Login,
  Profile,
  SignUp,
  UpdateProfile,
  VerificationCode,
} from "../Controllers/User.Controller.js";
import upload from "../Utils/upload.js";
import { Authorization } from "../Utils/Authorizations.js";
const router = express.Router();

router.post("/register", upload.single("profile"), SignUp);
router.post("/verify", VerificationCode);
router.post("/login", Login);
router.get("/profile", Authorization, Profile);
router.post(
  "/profile-update/:id",
  upload.single("profile"),
  Authorization,
  UpdateProfile
);

export default router;
