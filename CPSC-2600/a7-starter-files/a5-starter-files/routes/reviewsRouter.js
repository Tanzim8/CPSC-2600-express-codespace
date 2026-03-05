import { Router } from "express";
import { createReview, listReviews, getReview } from "../controllers/reviewsController.js";

const router = Router();

router.get("/", listReviews);   
router.post("/", createReview);
router.get("/:id", getReview);

export default router;