import { Router } from "express";
import { createRating } from "../controllers/ratingController.mjs";

const router = Router();

router.post("/create-rating", createRating);

export { router as RatingRouter };
