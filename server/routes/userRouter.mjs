import { Router } from "express";
import {
  signUp,
  getUser,
  signIn,
  checkToken,
  changePassword,
  deleteAllUsers,
} from "../controllers/userController.mjs";

const router = Router();

router.post("/sign-up", signUp);
router.get("/:id/get-user", getUser);
router.post("/sign-in", signIn);
router.get("/check-token", checkToken);
router.post("/change-password", changePassword);
// router.get("/delete-all", deleteAllUsers);

export { router as UserRouter };
