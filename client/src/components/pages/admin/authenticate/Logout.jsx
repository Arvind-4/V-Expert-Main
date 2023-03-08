import "../../../../assests/css/admin.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/admin/login");
    if (user) {
      localStorage.removeItem("user");
      alert("User Logged Out Successfully");
      navigate("/admin/login");
    }
  }, []);

  return <div></div>;
};
