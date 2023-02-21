import { Router } from "express";
import {
  getAllBookings,
  getSingleBooking,
  createBooking,
  deleteBooking,
  updateBooking,
} from "../controllers/bookingController.mjs";

const router = Router();

router.get("/all", getAllBookings);
router.post("/", createBooking);

router.get("/:id/get-booking", getSingleBooking);
router.patch("/:id/update-booking", updateBooking);
router.delete("/:id/delete-booking", deleteBooking);

export { router as BookingRouter };
