import { Router } from "express";
import { mailSend } from "../controllers/mailerController.mjs";

const router = Router();

router.post("/", mailSend);

export { router as MailRouter };
