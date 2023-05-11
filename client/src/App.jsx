import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/header/Header";
import Home from "./components/pages/home/Home";
import Package from "./components/pages/package/Package";
import Error from "./components/pages/error/Error";
import Footer from "./components/layouts/footer/Footer";
import Service from "./components/pages/services/Service";
import Admin from "./components/pages/admin/home/Admin";
import Login from "./components/pages/admin/authenticate/Login";
import Register from "./components/pages/admin/authenticate/Register";
import Logout from "./components/pages/admin/authenticate/Logout";
import ChangePassword from "./components/pages/admin/authenticate/ChangePassword";
import Cart from "./components/pages/cart/Cart";
import Checkout from "./components/layouts/Checkout";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/packages/:name"} element={<Package />} />
        <Route path={"/services/:name"} element={<Service />} />
        <Route path={"/checkout"} element={<Checkout />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/error"} element={<Error />} />
        <Route path={"/admin/panel"} element={<Admin />} />
        <Route path={"/admin/login"} element={<Login />} />
        <Route path={"/admin/logout"} element={<Logout />} />
        <Route path={"/admin/register"} element={<Register />} />
        <Route path={"/admin/change-password"} element={<ChangePassword />} />
        <Route path={"*"} element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
