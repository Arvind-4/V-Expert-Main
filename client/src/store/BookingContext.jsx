import { createContext, useEffect, useReducer } from "react";
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

function filterBookings(array, status, date) {
  return (
    array.filter((value) => value.date === date || value.status === status) ||
    []
  );
}

const BookingContext = createContext({
  items: [],
  filter: {},
  filterDate: (date) => {},
  filterStatus: (status) => {},
  removeBooking: async (id) => {},
  changeStatus: async (id, status) => {},
});

const defaultBooking = {
  items: bookings,
  filter: { status: "pending", date: "" },
};

function bookingReducer(state, action) {
  switch (action.type) {
    case "FILTER_DATE":
      return {
        items: filterBookings(bookings, state.filter.status, action.date),
        filter: { ...state.filter, date: action.date },
      };
    case "FILTER_STATUS":
      console.log(bookings);
      return {
        items: filterBookings(bookings, action.status, state.filter.date),
        filter: { ...state.filter, status: action.status },
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
    removeBooking: async (id) => {
      deleteBooking(id);
    },
    changeStatus: async (id, status) => {
      changeStatus(id, status);
    },
  };
  return (
    <BookingContext.Provider value={bookingContext}>
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
