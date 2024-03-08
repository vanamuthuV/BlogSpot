import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "./assets/Header/Header";
import "./assets/SignUp/SignUp.css";
import { SignUp } from "./assets/SignUp/SignUp";
import { Search } from "./assets/search/search";
import CircularProgress from "@mui/material/CircularProgress";
import { Footer } from "./assets/Footer/footer";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
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
      <div className="OuterLogin">
        <div className="LoginOrSignUp">
          <h1 className="mt-10 mb-10 text-2xl font-bold">Join Inkwellify.</h1>
          <div>
            <Link to={"/SignUp"}>
              <button
                onClick={() => {
                  setSignUpAnfLogin((prev) => !prev);
                  localStorage.setItem("page", !signUpAndLogin);
                  console.log(localStorage.getItem("page"));
                }}
                className="SLB"
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
                className="SLB"
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

export const SearchLayout = () => {
  return (
    <>
      <Search />
      <Outlet />
    </>
  );
};
