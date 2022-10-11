import React, { useState } from "react";
import InputComponent from "./InputComponent";
import logo from "../../../assets/logo.png";
import Swal from "sweetalert2";
import { apiBaseURL } from "../../../axios";
import axios from "axios";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";

import { useSelector } from "react-redux";

const RecoverPassword = () => {
  const token = useSelector((state) => state.user.token);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log("just check the: ", token);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    console.log(confirmPassword);
    e.preventDefault();
    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "info",
        title: "Password does not match",
        text: "Make sure the passowrd you entered are the same",
      });
    }
    try {
      const userData = {
        password,
      };
      await axios.post(
        `${apiBaseURL}/v1/auth/reset-password?resetToken=${token}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return Swal.fire({
        icon: "success",
        title: "Password Details Sent",
        text: "Check your email to recover your password",
      });
    } catch (err) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}. Try again.`,
      });
    }
  };

  return (
    <div className=" h-screen  flex items-center justify-center flex-col bg-slate-100">
      <div className="w-full lg:max-w-md max-w-sm py-6 bg-white shadow lg:m-0 mx-[20px]">
        <form
          className="px-8  py-12 flex items-center justify-center flex-col"
          onSubmit={handleChangePassword}
        >
          {/* Password reset header */}
          <div className="flex gap-2 items-center justify-center ">
            <img src={logo} alt="Ribi logo" className="w-[30px]" />
            <p className="{styles.logoText}">RIBI</p>
          </div>
          <div className="py-2 text-slate-700 text-center text-[22px] my-2 font-bold">
            <h3>Password Reset</h3>
          </div>
          <div className="my-4 grid w-full">
            <label htmlFor="password" className="mb-2">
              New Password
            </label>
            <div className="relative">
              <InputComponent
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-4 rounded-full shadow appearance-none border border-slate-200 text-slate-700 focus:shadow-outline outline-0"
              />
              <div className="absolute right-2 top-2">
                {showPassword === false ? (
                  <RemoveRedEye
                    style={{ color: "#C0C6C9", cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <VisibilityOff
                    style={{ color: "#C0C6C9", cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="my-4 grid w-full">
            <label htmlFor="password" className="mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <InputComponent
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-2 px-4 rounded-full shadow appearance-none border border-slate-200 text-slate-700 focus:shadow-outline outline-0"
              />
              <div className="absolute right-2 top-2">
                {showConfirmPassword === false ? (
                  <RemoveRedEye
                    style={{ color: "#C0C6C9", cursor: "pointer" }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <VisibilityOff
                    style={{ color: "#C0C6C9", cursor: "pointer" }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center my-2">
            <button
              type="submit"
              className="border-[#f6655f] border-[1px] text-[#f6655f] rounded-full cursor-pointer hover:bg-red-600 hover:text-white py-3 px-10"
              //   onClick={handleChangePassword}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
