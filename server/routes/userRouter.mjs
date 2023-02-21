import { Router } from "express";
import { signUp, getUser, signIn } from "../controllers/userController.mjs";

const router = Router();

router.post("/sign-up", signUp);
router.get("/:id/get-user", getUser);
router.post("/sign-in", signIn);

export { router as UserRouter };
