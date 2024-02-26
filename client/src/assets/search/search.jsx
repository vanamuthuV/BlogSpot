import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import Avatar from "@mui/material/Avatar";

const ACCOUNTSEARCH = "/accountsearch";

export const Search = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <h1 className="text-xl">Search By</h1>
      <div className="flex flex-row items-center justify-between w-3/4 pt-3 max-md:w-11/12">
        <Link
          className="w-full text-lg rounded-full max-md:text-sm"
          to={"/Search"}
        >
          <button className="w-full pt-2 pb-2 text-lg border-2 border-orange-500 rounded-tl-full rounded-bl-full active:text-orange-500 bg-gray-50 border-r-white max-md:text-sm max-md:border">
            Account
          </button>
        </Link>

        <Link className="w-full text-lg max-md:text-sm" to={"/Search/Posts"}>
          <button className="w-full pt-2 pb-2 text-lg border-2 border-orange-500 bg-gray-50 border-r-white max-md:text-sm max-md:border">
            Posts
          </button>
        </Link>

        <Link className="w-full text-lg max-md:text-sm" to={"/Search/Tags"}>
          <button className="w-full pt-2 pb-2 text-lg border-2 border-orange-500 bg-gray-50 border-r-white max-md:text-sm max-md:border">
            Tags
          </button>
        </Link>

        <Link className="w-full text-l max-md:text-sm" to={"/Search/Category"}>
          <button className="w-full pt-2 pb-2 text-lg border-2 border-orange-500 rounded-tr-full rounded-br-full bg-gray-5 max-md:text-sm max-md:border">
            Category
          </button>
        </Link>
      </div>
    </div>
  );
};

export const Account = () => {
  const Account = useRef();

  useEffect(() => {
    Account.current.focus();
  }, []);

  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState([]);

  const FetchContinous = async () => {
    setLoading(true);
    console.log(Account.current.value);

    const data = {
      user_name: Account.current.value,
    };

    try {
      const resposne = await axios.post(ACCOUNTSEARCH, data);
      console.log(resposne?.data?.data);
      setPosts(resposne?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex flex-col items-center justify-center w-3/4 mt-8 mb-8">
        <div className="flex flex-row items-center justify-center w-full">
          <input
            className="w-3/4 pt-2 pb-2 text-base border-2 border-gray-900 rounded-full max-md:w-11/12 bg-inherit focus:pl-5 max-md:text-sm focus:outline-none"
            placeholder="Search by Account"
            ref={Account}
            onChange={FetchContinous}
          ></input>
        </div>

        {loading ? (
          <div className="flex flex-row items-center justify-center w-full h-full">
            <h1>loading...</h1>
          </div>
        ) : (
          <div className="flex flex-col items-center w-3/4 max-md:w-11/12">
            {posts.length === 0 && typeof posts[0] === "object" ? (
              <div className="pt-10">
                <h1>No Search Results Found</h1>
              </div>
            ) : (
              <div className="flex flex-col justify-center w-10/12 max-md:w-full">
                {posts.map((post) => {
                  return (
                    <Link to={`/${post.user_name}`}>
                      <div className="flex flex-row items-center mt-5">
                        <div className="flex flex-row items-center justify-center min-w-16 max-w-16 min-h-16 max-h-16">
                          {post.profileimage === null ? (
                            <img
                              className="rounded-full min-w-16 max-w-16 min-h-16 max-h-16 max-md:min-w-10 max-md:max-w-10 max-md:min-h-10 max-md:max-h-10"
                              src="../../../public/ProfileDope.jpeg"
                            />
                          ) : (
                            <img
                              className="rounded-full min-w-16 max-w-16 min-h-16 max-h-16 max-md:min-w-10 max-md:max-w-10 max-md:min-h-10 max-md:max-h-10"
                              src={`http://localhost:5000/${post.profileimage}`}
                            />
                          )}
                        </div>
                        <div className="flex flex-col justify-center pl-5 max-md:pl-0">
                          <p className="text-base text-gray-400 max-md:text-sm">
                            @{post.user_name}
                          </p>
                          <p className="text-lg max-md:text-base">
                            {post.userfullname}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
