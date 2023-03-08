import React from "react";
import { createPortal } from "react-dom";
import "../../../../assests/css/admin/input.css";
const Overlay = () => {
  return <div className="absolute h-screen w-screen backdrop-blur-sm"></div>;
};

const Modal = ({ booking, display }) => {
  const closeClickHandler = () => {
    display((prevState) => !prevState);
  };

  return (
    <>
      {createPortal(<Overlay />, document.getElementById("overlay"))}
      <div className="w-3/4 h-3/4 p-4 overflow-scroll Scroll bg-white border-2 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl mb-4">{booking.name}</h1>
        <caption className="text-xl">Services</caption>
        <ul className="ml-8 list-disc my-2">
          {booking.services &&
            booking.services.map((service) => <li>{service}</li>)}
        </ul>
        <caption className="text-xl">Packages</caption>
        <ul className="ml-8 list-disc my-2">
          {booking.packages && booking.packages.map((pkg) => <li>{pkg}</li>)}
        </ul>
        <h3 className="text-xl">Additional Requirements</h3>
        <p>{booking.requirements}</p>
        <button
          className="absolute top-0 right-0 px-2 bg-gray-400"
          onClick={closeClickHandler}
        >
          X
        </button>
      </div>
    </>
  );
};

export default Modal;
