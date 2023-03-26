import React from "react";
import { createPortal } from "react-dom";

const Overlay = () => {
  return <div className="absolute h-screen w-screen backdrop-blur-sm"></div>;
};

const Modal = ({ booking, display }) => {
  const closeClickHandler = () => {
    display((prevState) => !prevState);
  };

  console.log("Modal Rendered", booking);

  return (
    <>
      {createPortal(<Overlay />, document.getElementById("overlay"))}
      <div className="w-3/4 h-3/4 p-4 overflow-scroll Scroll bg-white border-2 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl">{booking.name}</h1>
        <p className="mb-4">Property Type - {booking.propertyType}</p>
        <caption className="text-xl">Services</caption>
        {/* {booking.services.length === 0 && <p>No Services Selected</p>}
            {booking.pkg.length === 0 && <p>No Packages Selected</p>} */}

        {booking.serviceList && booking.serviceList.length > 0 ? (
          <ul className="ml-8 list-disc my-2">
            {booking.services.map((service) => (
              <li>{service}</li>
            ))}
          </ul>
        ) : (
          <p>No Services Selected</p>
        )}

        <caption className="text-xl">Packages</caption>
        {booking.packageList && booking.packageList.length > 0 ? (
          <ul className="ml-8 list-disc my-2">
            {booking.serviceList.map((pkg) => (
              <li>{pkg}</li>
            ))}
          </ul>
        ) : (
          <p>No Packages Selected</p>
        )}
        <h3 className="text-xl">Additional Requirements</h3>
        <p>{booking.requirements}</p>
        <button
          className="fixed top-0 right-0 px-2 bg-gray-400"
          onClick={closeClickHandler}
        >
          X
        </button>
      </div>
    </>
  );
};

export default Modal;
