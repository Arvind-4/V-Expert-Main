import React from "react";
import Buy from "./Buy";
import Service from "../home/Service";
import Package from "../home/Package";
const Cart = () => {
  return (
    <main className="bg-gray pb-12">
      <Buy />
      <Service />
      <Package />
    </main>
  );
};

export default Cart;
