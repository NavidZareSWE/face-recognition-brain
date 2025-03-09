import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import AIRouter from "./routes/AIRoute.js";
import { handleRegister } from "./controllers/RegisterController.js";
import { signInHandler } from "./controllers/SignInController.js";
import { profileHandler } from "./controllers/ProfileController.js";
import { imageHandler } from "./controllers/ImageController.js";
import knexConfig from "./config/knex.js";

/**********************************
 ********** App Config ************
 ********************************** */
const app = express();
const port = process.env.PORT || 3_000;
const db = knexConfig;

app.use(cors());
app.use(bodyParser.json());
/**********************************
 ********* API Endpoints **********
 ********************************** */
app.get("/", (req, res) => {
  res.send("API is Working");
});
app.post("/signin", signInHandler(db, bcrypt));
app.post("/register", handleRegister(db, bcrypt));
app.get("/profile/:id", profileHandler(db));
app.post("/image", imageHandler(db));
app.use("/api/ai", AIRouter);

// **********************************
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
