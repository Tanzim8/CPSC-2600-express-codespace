import { Router } from "express";
import { listAuthors, getAuthor } from "../controllers/authorsController.js";

const router = Router();

router.get("/", listAuthors);
router.get("/:id", getAuthor);

export default router;