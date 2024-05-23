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
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export const SignUpLayout = () => {
  const [signUpAndLogin, setSignUpAnfLogin] = useState(true);

  useEffect(() => {
    console.log(localStorage.getItem("page"));
    setSignUpAnfLogin(
      localStorage.getItem("page") === null
        ? true
        : localStorage.getItem("page")
    );
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center w-3/4 p-5 mt-10 shadow-2xl">
        <div className="w-2/4 max-md:w-3/4">
          <h1 className="mt-10 mb-10 text-2xl font-bold text-center max-md:text-base">
            Join Inkwellify.
          </h1>
          <div className="flex flex-row items-center justify-around">
            <Link to={"/SignUp"}>
              <button
                onClick={() => {
                  setSignUpAnfLogin((prev) => !prev);
                  localStorage.setItem("page", !signUpAndLogin);
                  console.log(localStorage.getItem("page"));
                }}
                className="pt-2 pb-2 pl-3 pr-3 rounded-lg text-md max-md:text-vs  max-md:pt-1.5 max-md:pb-1.5"
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
                onClick={() => {
                  setSignUpAnfLogin((prev) => !prev);
                  localStorage.setItem("page", !signUpAndLogin);
                  console.log(localStorage.getItem("page"));
                }}
                className="pt-2 pb-2 pl-3 pr-3 rounded-lg text-md max-md:text-vs  max-md:pt-1.5 max-md:pb-1.5"
                style={{
                  border: signUpAndLogin && "1px solid #ff6500",
                  backgroundColor: !signUpAndLogin && "#ff6500",
                  color: !signUpAndLogin ? "#fffefd" : "#ff6500",
                }}
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

