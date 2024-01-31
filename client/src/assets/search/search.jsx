import React from "react";

export const Search = () => {
    return (
      <div className="flex flex-col items-center justify-center pt-5">
        <h1 className="text-xl">Search By</h1>
        <div className="flex flex-row items-center justify-between w-3/4 pt-3 max-md:w-11/12">
          <button className="w-full pt-2 pb-2 text-lg bg-gray-400 hover:opacity-50 max-md:text-sm">
            Account
          </button>
          <button className="w-full pt-2 pb-2 text-lg bg-gray-400 max-md:text-sm hover:opacity-50 ">
            Posts
          </button>
          <button className="w-full pt-2 pb-2 text-lg bg-gray-400 max-md:text-sm hover:opacity-50 ">
            Tags
          </button>
          <button className="w-full pt-2 pb-2 text-lg bg-gray-400 max-md:text-sm hover:opacity-50 ">
            Category
          </button>
        </div>
      </div>
    );
}