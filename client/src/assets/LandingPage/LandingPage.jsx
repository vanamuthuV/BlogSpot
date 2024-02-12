import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex flex-col items-start justify-end w-full pl-10 mt-10 h-96 bg-inherit">
        <div className="w-4/6 mb-8">
          <h1 className="text-4xl">
            "Welcome to a world where words dance off the page and ideas ignite
            your imagination."
          </h1>
        </div>
        <div>
          <Link to={Object.keys(user).length === 0 ? "/SignUp" : "createpost"}>
            <button className="pt-2 pb-2 pl-8 pr-8 font-bold bg-orange-500 rounded-lg text-gray-50 mr-2.5">
              Create Post
            </button>
          </Link>
          <Link to={"/Read Blog"}>
            <button className="pt-2 pb-2 pl-8 pr-8 ml-2.5 font-bold text-orange-500 border border-orange-500 rounded-lg bg-gray-50">
              Start Reading
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full h-40"></div>
    </div>
  );
};
