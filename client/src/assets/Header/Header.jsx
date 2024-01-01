import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { SignUp } from "../SignUp/SignUp";
import useAuth from "../../../hooks/useAuth";

const NavElements = ["Contact", "About", "Read Blog"];

export const Navbar = () => {

  const { user } = useAuth();
  
  console.log(user)

  return (
    <nav>
      <div className="flex items-center justify-between row-auto mt-5 mb-5 ml-3 mr-3">
        <Link to={"/"}>
          <div className="flex items-center justify-between row-auto">
            <img
              width={28}
              className="ml-3 mr-3"
              src="../public/navbar/BlogSpot.svg"
              alt="BlogSpot-Logo"
            />
            <h1 className="text-2xl font-medium">BLOGSPOT</h1>
          </div>
        </Link>
        <div className="flex row-auto ">
          {NavElements.map((items) => {
            return (
              <Link to={`/${items}`}>
                <li className="ml-5 mr-5 text-lg font-normal list-none cursor-pointer">
                  <a href="">{items}</a>
                </li>
              </Link>
            );
          })}
          <Link to={"/SignUp"}>
            {user.user_name ? (
              <li className="ml-5 mr-5 text-lg font-normal list-none cursor-pointer">
                {user.user_name}
              </li>
            ) : (
              <li className="ml-5 mr-5 text-lg font-normal list-none cursor-pointer">
                Sign Up
              </li>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};