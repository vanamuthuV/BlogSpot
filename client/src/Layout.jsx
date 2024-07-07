import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "./assets/Header/Header";
import "./assets/SignUp/SignUp.css";
import { SignUp } from "./assets/SignUp/SignUp";
import { Footer } from "./assets/Footer/footer";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="relative h-[calc(100vh-57px)">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export const SignUpLayout = () => {
  const [signUpAndLogin, setSignUpAnfLogin] = useState(true);

  useEffect(() => {
    // console.log(localStorage.getItem("page"));
    setSignUpAnfLogin(localStorage.getItem("page"));
  }, []);

  const HandleButton = () => {
    localStorage.setItem("page", !signUpAndLogin);
    setSignUpAnfLogin((prev) => !prev);
  };

  const styleTrue = {
    border: "1px solid #ff6500",
    backgroundColor: "#ff6500",
    color: "#fffefd",
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center w-3/4 p-5 shadow-2xl rounded-2xl max-md:w-11/12">
        <div className="w-2/4 max-md:w-11/12">
          <h1 className="mt-10 mb-10 text-2xl font-bold text-center max-md:text-base">
            Join Inkwellify.
          </h1>
          <div className="flex flex-row items-center justify-around">
            <Link to={"/SignUp"}>
              <button
                onClick={HandleButton}
                className="pt-2 pb-2 pl-3 pr-3 rounded-lg text-md max-md:text-vs  max-md:pt-1.5 max-md:pb-1.5 text-orange-500"
                style={{
                  border: !signUpAndLogin && "1px solid #ff6500",
                  backgroundColor: signUpAndLogin && "#ff6500",
                  color: signUpAndLogin ? "#fffefd" : "#ff6500",
                }}
              >
                Sign Up
              </button>
            </Link>
            <Link to={"/SignUp/login"}>
              <button
                onClick={HandleButton}
                className="pt-2 pb-2 pl-3 pr-3 rounded-lg text-md max-md:text-vs  max-md:pt-1.5 max-md:pb-1.5 text-orange-500"
                style={{
                  border: signUpAndLogin && "1px solid #ff6500",
                  backgroundColor: !signUpAndLogin && "#ff6500",
                  color: !signUpAndLogin ? "#fffefd" : "#ff6500",
                }}
                // style={signUpAndLogin === false ? styleTrue : {}}
              >
                Login
              </button>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export const SignUpPersonalLayout = () => {
  return (
    <>
      <SignUp />
      <Outlet />
    </>
  );
};

export const ForgetPasswordLayout = () => {
  return (
    <div className="w-full h-[calc(100vh-57px)] flex flex-col items-center justify-center">
      <p className="mt-5 mb-10 text-2xl">Join Inwellify</p>
      <Outlet />
    </div>
  );
};
