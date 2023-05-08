import { downloadData } from "../controllers/backUpController.mjs";
import { Router } from "express";

const router = Router();

router.get("/download-data", downloadData);

export { router as BackUpRouter };
