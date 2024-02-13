import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const LANDINGDATA = "/landingdata";

export const LandingPage = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(LANDINGDATA);
        console.log(response?.data?.data);
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-start justify-end w-full pl-10 mb-16 mt-28 h-96 bg-inherit">
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
      <div className="flex flex-col items-center justify-center w-full pb-20">
        <h1 className="pt-10 pb-10 text-3xl text-center text-orange-500">
          Trending Blogs
        </h1>
        {loading ? (
          <div className="flex flex-row items-center justify-center w-full h-40">
            <CircularProgress disableShrink />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap items-center justify-around w-full gap-5">
            {data.map((post) => {
              return (
                <div className="flex flex-row items-center max-w-72 min-w-80">
                  <div className="w-20 h-12">
                    <img
                      className="object-contain rounded-lg min-h-12 min-w-20 max-h-12 max-w-20"
                      src={`http://localhost:5000/${post.post_images}`}
                    ></img>
                  </div>
                  <div className="flex flex-col items-start justify-start w-full ml-2">
                    <Link to={`/Read Blog/${post.post_id}`}>
                      <p className="text-sm hover:underline">
                        {post.post_title.length > 30
                          ? post.post_title.substring(0, 30) + "..."
                          : post.post_title}
                      </p>
                    </Link>

                    <div className="flex flex-row items-center justify-between w-full pt-2">
                      <div className="flex flex-row items-center justify-center">
                        <img
                          className="min-w-5 max-w-5 min-h-5 max-h-5"
                          src={
                            post.profileimage
                              ? `http://localhost:5000/${post.profileimage}`
                              : "../../../public/Profile.jpeg"
                          }
                        />
                        <Link to={`/${post.user_name}`}>
                          <p className="pl-1 text-xs hover:underline">
                            {post.user_name.length > 6
                              ? post.user_name.substring(0, 6) + "..."
                              : post.user_name}
                          </p>
                        </Link>
                      </div>
                      <p className="flex flex-row items-center justify-center text-xs text-neutral-500">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5 pr-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                          />
                        </svg>
                        {post.likes_count} */}
                        {Math.round(post.post_content.split("").length / 200)}
                        <span className="pl-1">min read</span>
                      </p>
                      <p className="text-xs text-neutral-500">
                        {format(post.post_upload_time, "MMM dd,yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
