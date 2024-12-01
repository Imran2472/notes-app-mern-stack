import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import DBConnect from "./Config/DBConnection.js";
import UserRoutes from "./Routes/User.Route.js";
import NotesRouter from "./Routes/Notes.Route.js";
const app = express();
app.use(json());
dotenv.config();
DBConnect();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/v1/api/user", UserRoutes);
app.use("/v1/api/notes", NotesRouter);
app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
