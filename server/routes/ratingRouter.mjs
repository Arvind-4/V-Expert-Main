import { Router } from "express";
import {
    createRating,
    getAllRatings
} from "../controllers/ratingController.mjs";
import { loginRequired } from "../middleware/loginRequired.mjs";

const router = Router();

router.post("/create-rating", createRating);
router.get("/get-all-ratings", loginRequired, getAllRatings);

export { router as RatingRouter };
