import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import { createPortal } from "react-dom";
import styles from "../../../../assests/css/table.module.css";

const Bookings = (props) => {
  const [modalBooking, setModalBooking] = useState({});
  const [showModal, setshowModal] = useState(false);

  const viewClickHandler = (id) => {
    setshowModal((state) => !state);
    setModalBooking(props.bookings.find((booking) => booking.id === id));
  };

  return (
    <tbody>
      {showModal
        ? createPortal(
            <Modal booking={modalBooking} display={setshowModal} />,
            document.getElementById("modal")
          )
        : ""}
      {props.bookings.map((booking) => (
        <tr key={booking.id} className="shadow-md">
          <td className="text-center">{booking.id}</td>
          <td className="max-w-[200px] min-w-[200px]">{booking.name}</td>
          <td className="max-w-[200px] min-w-[200px]">{booking.email}</td>
          <td>{booking.phone}</td>
          <td className="max-w-[300px] min-w-[300px]">
            <div className={`Scroll h-16 overflow-y-scroll`}>
              {booking.address}
            </div>
          </td>
          <td>{booking.date}</td>
          <td>{booking.time}</td>
          <td className="text-center">
            <button
              onClick={() => viewClickHandler(booking.id)}
              className="w-full py-1 px-2 my-1 bg-blue text-white rounded"
            >
              View
            </button>
          </td>
          <td className="text-center">
            <button
              className={`w-full py-1 px-2 my-1 ${
                booking.status === "completed" ? "bg-green" : ""
              } 
                                ${
                                  booking.status === "cancelled"
                                    ? "bg-red"
                                    : ""
                                } 
                                ${
                                  booking.status === "pending"
                                    ? "bg-gray"
                                    : ""
                                }
                                text-white rounded
                            `}
            >
              {booking.status}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const Table = (props) => {
  return (
    <div className="mx-auto max-w-full rounded overflow-x-scroll Scroll">
      {props.bookings.length > 0 ? (
        <table className={`${styles.Table}`}>
          <thead>
            <tr className="h-16">
              <th className="">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Date</th>
              <th>Time</th>
              <th>Requirements</th>
              <th>Status</th>
            </tr>
          </thead>
          <Bookings bookings={props.bookings} setBookings={props.setBookings} />
        </table>
      ) : (
        <h1 className="text-2xl mt-4">No Bookings Available !</h1>
      )}
    </div>
  );
};

export default Table;
