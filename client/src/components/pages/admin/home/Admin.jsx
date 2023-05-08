import { useEffect, useState } from "react";
import Table from "./Table";
import Sort from "./Sort";
import AdminHeader from "../AdminHeader";

import { useNavigate } from "react-router-dom";
import { getBookings, checkToken } from "../api";
import { BookingProvider } from "../../../../store/BookingContext";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/admin/login");
    else {
      checkToken(user).then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("user");
          navigate("/admin/login");
        } else {
          setLoading(true);
          getBookings(status).then((res) => {
            if (res) {
              setBookings(res.data);
              setLoading(false);
            } else {
              setBookings([]);
              setLoading(false);
            }
          });
        }
      });
    }
  }, [status]);

  return (
    <BookingProvider>
      <AdminHeader />
      <Sort />
      <Table />
    </BookingProvider>
  );
}
