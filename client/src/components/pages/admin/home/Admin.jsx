import { useEffect, useState } from "react";
import Table from "./Table";
import Sort from "./Sort";

import { useNavigate } from "react-router-dom";
import { getBookings, checkToken } from "../api";

function ConvertDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  date =
    (dd > 10 ? dd : "0" + dd) + "/" + (mm > 10 ? mm : "0" + mm) + "/" + yyyy;
  return date;
}

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("pending");
  const [date, setDate] = useState(ConvertDate(new Date()));
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
    <div>
      {loading && <div className="loading">Loading...</div>}
      <Sort status={setStatus} />
      <Table bookings={bookings} setBookings={setBookings} />
    </div>
  );
};

export default Admin;
