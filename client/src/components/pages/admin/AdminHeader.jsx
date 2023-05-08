import { useNavigate } from "react-router-dom";
import { downloadData } from "./api";

export default () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div
      className={
        "space-x-5 items-center text-right py-2 bg-white shadow-md my-4 px-12"
      }
    >
      <button
        className={
          "text-lg px-2 py-1 border-2 rounded"
        }
        onClick={downloadData}
      >
        Download Report
      </button>

      <button
        className={
          "text-lg px-2 py-1 border-2 bg-blue text-white rounded"
        }
        onClick={handleLogout}
      >
        Log Out
      </button>

    </div>
  );
};
