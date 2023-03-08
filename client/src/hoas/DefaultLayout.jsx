import React from "react";
import Footer from "../components/layouts/footer/Footer";
import Header from "../components/layouts/header/Header";
import { Outlet } from "react-router-dom";
export default function DefaultLayout({ children }) {
  <React.Fragment>
    <Header />
    <Outlet />
    <Footer />
  </React.Fragment>;
}
