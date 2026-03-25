import express from "express";
import { listCourses } from "../controllers/coursesController.js";

const router = express.Router();

router.get("/", listCourses);

export default router;