import React, { createContext, useReducer } from "react";
import { getBookings } from "../components/pages/admin/api";

const bookingsResponse = await getBookings("pending");
const bookings = bookingsResponse.data;

console.log("bookings from context: ", bookings);

export function ConvertDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  date =
    (dd > 10 ? dd : "0" + dd) + "/" + (mm > 10 ? mm : "0" + mm) + "/" + yyyy;
  return date;
}

function filterBookings(array, status, date) {
  console.log(status, date);
  return array.filter(
    (value) => value.date === date && value.status === status
  );
}

const BookingContext = createContext({
  items: [],
  filter: {},
  filterDate: (date) => {},
  filterStatus: (status) => {},
  removeBooking: (id) => {},
  changeStatus: (id) => {},
});

const defaultBooking = {
  items: [...bookings],
  filter: { status: "pending", date: ConvertDate(new Date()) },
};

function bookingReducer(state, action) {
  if (action.type === "REMOVE_BOOKING") {
    // Do POST request for deleting the booking
  } else if (action.type === "FILTER_DATE") {
    return {
      items: filterBookings(bookings, state.filter.status, action.date),
      filter: { ...state.filter, date: action.date },
    };
  } else if (action.type === "FILTER_STATUS") {
    return {
      items: filterBookings(bookings, action.status, state.filter.date),
      filter: { ...state.filter, status: action.status },
    };
  } else if (action.type === "CHANGE_STATUS") {
    // Do POST request for changing status of the booking
  }
}

export const BookingProvider = (props) => {
  const [bookingState, dispatchBookings] = useReducer(
    bookingReducer,
    defaultBooking
  );
  console.log("bookingState: ", bookingState.items);
  const bookingContext = {
    items: bookingState.items,
    filter: bookingState.filter,
    filterDate: (date) => dispatchBookings({ type: "FILTER_DATE", date: date }),
    filterStatus: (status) =>
      dispatchBookings({ type: "FILTER_STATUS", status: status }),
    removeBooking: (id) => dispatchBookings({ type: "REMOVE_BOOKING", id: id }),
    changeStatus: (id) => dispatchBookings({ type: "CHANGE_STATUS", id: id }),
  };
  return (
    <BookingContext.Provider value={bookingContext}>
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
