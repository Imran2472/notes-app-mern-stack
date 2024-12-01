import express from "express";
import { Authorization } from "../Utils/Authorizations.js";
import {
  CreatNotes,
  DeleteNotes,
  GetNotes,
  GetNotesById,
  UpdateNotesById,
} from "../Controllers/Notes.Controller.js";

const router = express.Router();

router.post("/create", Authorization, CreatNotes);
router.get("/allnotes", Authorization, GetNotes);
router.get("/singlenotes/:id", Authorization, GetNotesById);
router.put("/updatenotes/:id", Authorization, UpdateNotesById);
router.delete("/delete/:id", Authorization, DeleteNotes);

export default router;
