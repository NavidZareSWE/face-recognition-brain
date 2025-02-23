import express from "express";
import { detectFace } from "../controllers/AIControllers.js";

// Create a new Router object to handle routes related to AI operations
const AIRouter = express.Router();
AIRouter.post("/facedetect", detectFace);

export default AIRouter;
