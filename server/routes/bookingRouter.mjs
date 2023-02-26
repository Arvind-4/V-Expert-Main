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

router.get("/all", loginRequired, getAllBookings);
router.post("/", loginRequired, createBooking);

router.get("/pending", loginRequired, getPendingBookings);
router.get("/completed", loginRequired, getCompletedBookings);
router.get("/:id/get-booking", loginRequired, getSingleBooking);
router.patch("/:id/update-booking", loginRequired, updateBooking);
router.delete("/:id/delete-booking", loginRequired, deleteBooking);

export { router as BookingRouter };
