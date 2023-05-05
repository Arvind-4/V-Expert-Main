import React, { useContext } from "react";
import styles from "../../../../assests/css/table.module.css";
import Modal from "./Modal";
import { createPortal } from "react-dom";
import BookingContext from "../../../../store/BookingContext";

const Bookings = (props) => {
  const bookingContext = useContext(BookingContext);
  const [booking, setBooking] = React.useState({});
  const [showModal, setshowModal] = React.useState(false);

  const viewClickHandler = (id) => {
    setshowModal((prevState) => !prevState);
    setBooking(props.bookings.find((booking) => booking.id === id));
  };

  const onChangeHandler = (id, event) => {
    bookingContext.changeStatus(id, event.target.value);
  };
  const deleteClickHandler = (id) => {
    bookingContext.removeBooking(id);
  };

  console.log("Bookings", props.bookings)

  return (
    <tbody>
      {showModal
        ? createPortal(
            <Modal booking={booking} display={setshowModal} />,
            document.getElementById("modal")
          )
        : ""}
      {props.bookings.map((booking) => {
        return (
          <tr key={booking.created} className="shadow-md">
            <td className="text-center">{new Date(booking.created).toDateString()}</td>
            <td className="max-w-[200px] min-w-[200px]">{booking.name}</td>
            <td className="max-w-[200px] min-w-[200px]">{booking.email}</td>
            <td>{booking.phoneNumber}</td>
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
              <select
                id="status"
                onChange={(event) => onChangeHandler(booking.id, event)}
                className={`w-[120px] py-1 px-2 my-1 
                  ${booking.status === "completed" ? "bg-green" : ""} 
                  ${booking.status === "cancelled" ? "bg-red" : ""} 
                  ${booking.status === "pending" ? "bg-gray" : ""}
                  text-black rounded focus:outline-none
              `}
              >
                <option key={0} value={booking.status}>
                  {booking.status}
                </option>
                {["pending", "cancelled", "completed"].map((status, index) => {
                  if (booking.status !== status) {
                    return (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    );
                  }
                })}
              </select>
            </td>
            <td className="text-center">
              {booking.status !== "pending" ? (
                <button onClick={() => deleteClickHandler(booking.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              ) : null}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const Table = () => {
  const bookingContext = useContext(BookingContext);
  // console.log("Table", bookingContext.items);
  return (
    <div className="mx-auto max-w-full rounded overflow-x-scroll Scroll">
      {bookingContext.items && bookingContext.items.length > 0 ? (
        <table className={`${styles.Table}`}>
          <thead>
            <tr className="h-16">
              <th className="">Created Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Date</th>
              <th>Time</th>
              <th>Requirements</th>
              <th>Status</th>
              <th>----</th>
            </tr>
          </thead>
          {bookingContext.items ? (
            <Bookings bookings={bookingContext.items} />
          ) : (
            <h1 className="text-2xl mt-4">No Bookings Available !</h1>
          )}
        </table>
      ) : (
        <h1 className="text-2xl mt-4">No Bookings Available !</h1>
      )}
    </div>
  );
};

export default Table;
