import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";

const POSTSEARCH = "/postsearch";

export const Posts = () => {
  const Posts = useRef();

  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Posts.current.focus();
  }, []);

  const FetchContinous = async () => {
    setLoading(true)
    console.log(Posts.current.value);

    const data = {
      postName: Posts.current.value,
    };

    try {
      const resposne = await axios.post(POSTSEARCH, data);
      console.log(resposne?.data?.data);
      setPosts(resposne?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex flex-col items-center justify-center w-3/4 mt-8">
        <div className="flex flex-row items-center justify-center w-full">
          <input
            className="w-3/4 pt-2 pb-2 text-base border-2 border-gray-900 rounded-full max-md:w-11/12 bg-inherit focus:pl-5 max-md:text-sm focus:outline-none"
            placeholder="Search by Post Name"
            ref={Posts}
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
                    <Link className="cursor-normal">
                      <div className="flex flex-row items-center mt-5">
                        <Link to={`/Read Blog/${post.post_id}`}>
                          <div className="flex flex-row items-center justify-center min-w-28 max-w-28 min-h-18 max-h-18">
                            <img
                              className=" min-w-28 max-w-28 min-h-18 max-h-18 max-md:min-w-16 max-md:max-w-16 max-md:min-h-14 max-md:max-h-14"
                              src={`http://localhost:5000/${post.post_images}`}
                            />
                          </div>
                        </Link>

                        <div className="flex flex-col justify-center pl-5 max-md:pl-2">
                          <Link to={`/Read Blog/${post.post_id}`}>
                            <p className="text-sm max-md:text-xs">
                              {post.post_title.length <= 80
                                ? post.post_title
                                : post.post_title + "..."}
                            </p>
                          </Link>
                          <Link>
                            <p className="text-sm text-gray-500 max-md:text-xs">
                              By{" "}
                              <Link to={`/${post.user_name}`}>
                                <span className=" hover:underline">
                                  {post.user_name}
                                </span>
                              </Link>
                            </p>
                          </Link>
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
