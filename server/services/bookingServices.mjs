import { db } from "../index.mjs";
import { v4 as uuidv4 } from "uuid";

const getAllBookingsService = async () => {
  const bookingsCollection = await db.collection("bookings");
  const { results } = await bookingsCollection.list();
  const bookings = await Promise.all(
    results.map(async ({ key }) => (await bookingsCollection.get(key)).props)
  );
  if (bookings) {
    return bookings;
  } else {
    return null;
  }
};

const createNewBookingService = async (body) => {
  try {
    const bookingCollection = await db.collection("bookings");
    const {
      name,
      address,
      phoneNumber,
      serviceList,
      packageList,
      requirements,
      email,
      date,
      time,
      status,
    } = body;
    if (!name) {
      return null;
    }
    const bookingId = uuidv4();
    const booking = {
      id: bookingId,
      name,
      address,
      phoneNumber,
      serviceList,
      packageList,
      requirements,
      email,
      date,
      time,
      status,
    };
    await bookingCollection.set(bookingId, booking);
    return booking;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const updateBookingService = async (id, body) => {
  const bookingCollection = await db.collection("bookings");
  const { props } = await bookingCollection.get(id);
  const boooking = {};
  if (!props) return null;
  const {
    name,
    address,
    phoneNumber,
    serviceList,
    packageList,
    requirements,
    email,
    date,
    time,
    status,
  } = body;

  boooking.id = id;

  if (name) {
    boooking.name = name;
  } else {
    boooking.name = props.name;
  }

  if (address) {
    boooking.address = address;
  } else {
    boooking.address = props.address;
  }

  if (phoneNumber) {
    boooking.phoneNumber = phoneNumber;
  } else {
    boooking.phoneNumber = props.phoneNumber;
  }

  if (serviceList) {
    boooking.serviceList = serviceList;
  } else {
    boooking.serviceList = props.serviceList;
  }

  if (packageList) {
    boooking.packageList = packageList;
  } else {
    boooking.packageList = props.packageList;
  }

  if (requirements) {
    boooking.requirements = requirements;
  } else {
    boooking.requirements = props.requirements;
  }

  if (email) {
    boooking.email = email;
  } else {
    boooking.email = props.email;
  }

  if (date) {
    boooking.date = date;
  } else {
    boooking.date = props.date;
  }

  if (time) {
    boooking.time = time;
  } else {
    boooking.time = props.time;
  }

  if (status) {
    boooking.status = status;
  } else {
    boooking.status = props.status;
  }

  await bookingCollection.delete(id);

  await bookingCollection.set(id, boooking);
  return boooking;
};

export { createNewBookingService, getAllBookingsService, updateBookingService };
