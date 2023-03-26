import { Router } from "express";
import {
  getAllBookings,
  getSingleBooking,
  createBooking,
  deleteBooking,
  updateBooking,
  getPendingBookings,
  getCompletedBookings,
} from "../controllers/bookingController.mjs";
import { loginRequired } from "../middleware/loginRequired.mjs";
const router = Router();

router.get("/all", getAllBookings);
router.post("/", createBooking);

router.get("/pending", getPendingBookings);
router.get("/completed", getCompletedBookings);
router.get("/:id/get-booking", getSingleBooking);
router.patch("/:id/update-booking", updateBooking);
router.delete("/:id/delete-booking", deleteBooking);

export { router as BookingRouter };
