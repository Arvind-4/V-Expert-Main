import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { baseUrl } from "../../../../constants";
let error = false;

export default () => {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const entries = new FormData(e.target);
    const data = Object.fromEntries(entries);
    const response = await fetch(`${baseUrl}/user/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      const res = await response.json();
      const token = res.data;
      localStorage.setItem("user", token);
      alert("User Password Changed Successfully");
      navigate("/admin/panel");
    } else {
      alert("Wrong Credentials");
    }
  };

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) navigate("/admin/panel");
//   });

  return (
    <>
      <form
        className={
          "py-12 px-8 text-xl rounded-lg grid grid-col-1 gap-4 bg-white"
        }
        method="POST"
        onSubmit={submitHandler}
      >
        <div className={"text-center text-3xl mb-8 text-blue"}>
          V-Expert Password Change
        </div>
        {error ? (
          <div className={"text-center text-2xl mb-8 text-black]"}>
            Wrong Credentials
          </div>
        ) : (
          <></>
        )}
        <label className={"text-xl"} htmlFor={"email"}>
          Email
        </label>
        <input
          className={"form-input"}
          id={"email"}
          name={"email"}
          placeholder={"example@example.com"}
          required={true}
        />
        <label className={"text-xl"} htmlFor={"password"}>
          Old Password
        </label>
        <input
          className={"form-input"}
          id={"password"}
          name={"oldPassword"}
          placeholder={"Old Password"}
          type={"password"}
          required={true}
        />
        <label className={"text-xl"} htmlFor={"password"}>
          New Password
        </label>
        <input
          className={"form-input"}
          id={"password"}
          name={"newPassword"}
          placeholder={"New Password"}
          type={"password"}
          required={true}
        />
        <input
          className={
            "form-input cursor-pointer duration-300 mt-4 hover:bg-blue hover:text-white"
          }
          type={"submit"}
          value={"Change Password"}
        />
      </form>
    </>
  );
};


// "oldPassword": "newpassword",
// 	"newPassword": "1234"