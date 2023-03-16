import React from "react";
import { exportToCsv } from "../csv";
import Filters from "./Filters";

// let dates = [];
// Bookings.forEach((booking) => {
//   dates.push(booking.date);
//   dates = dates.filter((value, index, array) => {
//     return array.indexOf(value) === index;
//   });
// });
const Sort = (props) => {
  const filterStatus = (value) => {
    props.status(value);
  };
  // const filterDate = (value) => {
  //   props.date(value);
  // };

  return (
    <div className="flex gap-4 flex-wrap">
      <Filters
        filter={filterStatus}
        label="status"
        options={["pending", "completed"]}
      />
      <button onClick={exportToCsv}>Download Booking Data CSV</button>
      {/* <Filters filter={filterDate} label="Date" options={dates} /> */}
    </div>
  );
};

export default Sort;
