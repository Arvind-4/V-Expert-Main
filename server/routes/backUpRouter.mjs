import { downloadData } from "../controllers/backUpController.mjs";
import { Router } from "express";
import { loginRequired } from "../middleware/loginRequired.mjs";

const router = Router();

router.get("/download-data", loginRequired, downloadData);

export { router as BackUpRouter };
