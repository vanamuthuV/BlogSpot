import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-96 flex-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center text-orange-500">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-32 h-32 max-md:w-16 max-md:h-16"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          <p className="max-md:pl-2 text-9xl max-md:text-5xl">404</p>
        </div>
        <div className="flex flex-row items-center justify-end w-full max-md:mt-2">
          <p className="text-sm max-md:text-xs">
            With ❤️ By{" "}
            <Link to={"/"}>
              <span className="hover:underline">
                Ink<span className="text-orange-500">Wellify</span>
              </span>
            </Link>
          </p>
        </div>
        <div className="mt-20">
          <Link to={"/"}>
            <button className="flex flex-row items-center justify-center pt-2 pb-2 pl-5 pr-5 bg-orange-500 border-none rounded-lg text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 pr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              Back To Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
