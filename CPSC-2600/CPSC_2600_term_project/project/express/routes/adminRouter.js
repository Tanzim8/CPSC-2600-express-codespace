import express from "express";
import { listAdminCourses } from "../controllers/adminController";

const router = express.Router();

router.get("/courses", listAdminCourses);

export default router