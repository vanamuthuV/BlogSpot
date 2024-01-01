import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "./assets/Header/Header";
import "./assets/SignUp/SignUp.css"
import { SignUp } from "./assets/SignUp/SignUp"

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export const SignUpLayout = () => {
  const [signUpAndLogin, setSignUpAnfLogin] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="OuterLogin">
        <div className="LoginOrSignUp">
          <h1 className="Header">Login To Continue</h1>
          <div>
            <Link to={"/SignUp"}>
              <button
                onClick={() => {
                  setSignUpAnfLogin((prev) => !prev);
                }}
                className="SLB"
                style={{
                  backgroundColor: signUpAndLogin && "gray",
                  color: signUpAndLogin && "white",
                }}
              >
                Sign Up
              </button>
            </Link>
            <Link to={"/SignUp/login"}>
              <button
                onClick={() => {
                  setSignUpAnfLogin((prev) => !prev);
                }}
                className="SLB"
                style={{
                  backgroundColor: !signUpAndLogin && "gray",
                  color: !signUpAndLogin && "white",
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
