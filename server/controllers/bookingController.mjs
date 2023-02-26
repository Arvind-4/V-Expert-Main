import { db } from "../index.mjs";
import logger from "../utils/logger.mjs";

import {
  createNewBookingService,
  getAllBookingsService,
  updateBookingService,
  getPendingBookingsService,
  getCompletedBookingsService,
} from "../services/bookingServices.mjs";

const getAllBookings = async (req, res) => {
  try {
    const allBookings = await getAllBookingsService();
    if (allBookings)
      res.status(200).json({
        success: true,
        message: "Bookings fetched",
        data: allBookings,
      });
    else
      res.status(404).json({
        success: false,
        message: "No Bookings found",
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const createBooking = async (req, res) => {
  try {
    const booking = await createNewBookingService(req.body);
    if (booking)
      res.status(201).json({
        message: "Booking Created",
        success: true,
        data: booking,
      });
    else
      res.status(424).json({
        message: "Unable to create entry",
        success: false,
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const getSingleBooking = async (req, res) => {
  const { id } = req.params;
  if (!id)
    res.status(400).json({
      message: "Booking ID is required",
      success: false,
      data: null,
    });
  try {
    const bookingCollections = db.collection("bookings");
    const data = await bookingCollections.get(id);
    if (data === null) {
      res.status(404).json({
        message: "No Booking with id",
        success: false,
        data: null,
      });
    } else {
      res.status(200).json({
        message: "Booking found",
        success: true,
        data: data.props,
      });
    }
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  if (!id)
    res
      .status(400)
      .json({ message: "Booking ID is required", success: false, data: null });
  try {
    const bookingCollection = db.collection("bookings");
    const booking = await bookingCollection.delete(id);
    if (booking)
      res.status(200).json({
        message: "Deleted Booking",
        success: true,
        data: id,
      });
    else
      res.status(424).json({
        message: "Booking Not Found",
        success: false,
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      res.status(400).json({
        message: "Booking ID is required",
        success: false,
        data: null,
      });
    const booking = await updateBookingService(id, req.body);
    if (booking) {
      booking.id = id;
      res.status(200).json({
        message: "Updated Booking",
        success: true,
        data: booking,
      });
    } else
      res.status(424).json({
        message: "Booking Not Found",
        success: false,
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const getPendingBookings = async (req, res) => {
  try {
    const allBookings = await getPendingBookingsService();
    if (allBookings)
      res.status(200).json({
        success: true,
        message: "Bookings fetched",
        data: allBookings,
      });
    else
      res.status(404).json({
        success: false,
        message: "No Bookings found",
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const getCompletedBookings = async (req, res) => {
  try {
    const allBookings = await getCompletedBookingsService();
    if (allBookings)
      res.status(200).json({
        success: true,
        message: "Bookings fetched",
        data: allBookings,
      });
    else
      res.status(404).json({
        success: false,
        message: "No Bookings found",
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

export {
  getAllBookings,
  getSingleBooking,
  createBooking,
  deleteBooking,
  updateBooking,
  getPendingBookings,
  getCompletedBookings,
};
