import React, { createContext, useReducer } from "react";
import {
  deleteBooking,
  changeStatus,
  fetchAll,
} from "../components/pages/admin/api";

let res = await fetchAll();
let bookings = res.data;

export function ConvertDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  date =
    (dd > 10 ? dd : "0" + dd) + "/" + (mm > 10 ? mm : "0" + mm) + "/" + yyyy;
  return date;
}

function filterBookingOnState(status) {
  let filteredArray = bookings.filter(
    (value) => value.status === status
  );
  console.log("filteredArray", filteredArray)
  return filteredArray;
}

function filterBookingOnDate(date) {
  let filteredArray = bookings.filter(
    (value) => value.date === date
  );
  return filteredArray;
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
  items: [bookings.filter((value) => value.status === "pending")],
  filter: { status: "pending", date: ConvertDate(new Date()) },
};

async function bookingReducer(state, action) {
  if (action.type === "REMOVE_BOOKING") {
    return await deleteBooking(action.id);
  } else if (action.type === "FILTER_DATE") {
    return {
      items: filterBookingOnDate(action.date),
      filter: { ...state.filter, date: action.date },
    };
  } else if (action.type === "FILTER_STATUS") {
    return {
      items: filterBookingOnState(action.status),
      filter: { ...state.filter, date: action.date },
    };
  } else if (action.type === "CHANGE_STATUS") {
    await changeStatus(action.id, action.status);
    return {
      items: [bookings.filter((value) => value.status === action.status)],
    };
  }
}

export const BookingProvider = (props) => {
  const [bookingState, dispatchBookings] = useReducer(
    bookingReducer,
    defaultBooking
  );
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

