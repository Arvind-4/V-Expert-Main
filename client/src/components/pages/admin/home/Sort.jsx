import React, { useContext } from "react";
// import Filters from '../UI/Filters'
import Filters from "./Filters";
// import BookingContext from '../Store/BookingContext';
import BookingContext from "../../../../store/BookingContext";
import { getBookings } from "../api";

const BookingResponse = await getBookings("pending");
const Bookings = BookingResponse.data;

let dates = [];
Bookings.forEach((booking) => {
  dates.push(booking.date);
  dates = dates.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });
});
export default function Sort() {
  const bookingContext = useContext(BookingContext);

  const filterStatusHandler = (value) => {
    bookingContext.filterStatus(value);
  };
  const filterDateHandler = (value) => {
    bookingContext.filterDate(value);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      <Filters
        filter={filterStatusHandler}
        label="Status"
        options={["pending", "completed", "cancelled"]}
      />
      <Filters filter={filterDateHandler} label="Date" options={dates} />
    </div>
  );
}
