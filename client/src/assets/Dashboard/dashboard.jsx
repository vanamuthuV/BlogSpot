import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";

const DASHBOARD = "/getdashboard";
const MOREFAV = "/favload";
const MORELIKE = "/likeload";
const MOREDISLIKE = "/dislikeload";

export const Dashboard = () => {
  const { user } = useAuth();

  const [loading, setloading] = useState(true);
  const [dataFav, setDataFav] = useState([]);
  const [dataLike, setDataLike] = useState([]);
  const [dataDisLike, setDataDislike] = useState([]);

  const [favlen, setfavlen] = useState(0);
  const [likelen, setlikelen] = useState(0);
  const [dislikelen, setdislikelen] = useState(0);

  const [moreFav, setMoreFav] = useState(false);
  const [moreLike, setMoreLike] = useState(false);
  const [moreDislike, setMoreDislike] = useState(false);

  const FavContentReq = async () => {
    try {
      const response = await axios.post(
        MOREFAV,
        { user_id: user.user_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response?.data?.data);
      setDataFav(response?.data?.data);
      setMoreFav(false);
    } catch (error) {
      console.log(error);
    }
  };

  const LikeContentReq = async () => {
    try {
      const response = await axios.post(
        MORELIKE,
        { user_id: user.user_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response?.data?.data);
      setDataLike(response?.data?.data);
      setMoreLike(false);
    } catch (error) {
      console.log(error);
    }
  };

  const DisLikeContentReq = async () => {
    try {
      const response = await axios.post(
        MOREDISLIKE,
        { user_id: user.user_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response?.data?.data);
      setDataDislike(response?.data?.data);
      setMoreDislike(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          DASHBOARD,
          { user_id: user.user_id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response?.data?.data);
        setfavlen(response?.data?.data?.Favorites.length);
        setlikelen(response?.data?.data?.Likes.length);
        setdislikelen(response?.data?.data?.DisLikes.length);

        if (
          response?.data?.data?.Favorites.length !== 0 &&
          response?.data?.data?.Favorites.length > 2
        )
          setMoreFav(true);
        if (
          response?.data?.data?.Likes.length !== 0 &&
          response?.data?.data?.Likes.length > 2
        )
          setMoreLike(true);
        if (
          response?.data?.data?.DisLikes.length !== 0 &&
          response?.data?.data?.DisLikes.length > 2
        )
          setMoreDislike(true);

        setDataFav(response?.data?.data?.Favorites.splice(0, 2));
        setDataLike(response?.data?.data?.Likes.splice(0, 2));
        setDataDislike(response?.data?.data?.DisLikes.splice(0, 2));
        console.log(response?.data?.data?.Favorites);

        setloading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-row items-center justify-center mb-16">
      <div className="flex flex-col items-center justify-center w-10/12">
        {/* <div className="flex flex-col items-end justify-center w-full max-md:mb-10">
          <div className="flex flex-col items-start justify-center">
            <div className="flex flex-row items-center justify-end mt-10">
              <img
                className="mr-3 rounded-full max-md:mr-2 min-h-10 min-w-10 max-h-10 max-w-10 max-md:min-h-5 max-md:max-h-5 max-md:max-w-5 max-md:min-w-5"
                src={
                  user.profileimage
                    ? `http://localhost:5000/${user.profileimage}`
                    : "../../../public/Profile.jpeg"
                }
              />
              <Link
                className="hover:underline max-md:text-sm"
                to={`/${user.user_name}`}
              >
                {user.user_name}
              </Link>
            </div>
            <p className="max-md:text-sm">{user.user_email || user.Gmail}</p>
          </div>
        </div> */}
        <h1 className="w-full mt-10 text-4xl text-orange-500 align-start">
          Dashboard
        </h1>
        {loading ? (
          <div className="flex flex-row items-center justify-center w-full h-96">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col items-start justify-center w-11/12">
            <div className="flex flex-col items-start w-full mt-10">
              <h1 className="flex flex-row items-center w-full pb-3 mb-10 text-2xl border border-b-gray-700 border-t-white border-l-white border-r-white">
                Favorites{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8 pl-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </h1>
              <div className="flex flex-col items-center justify-center w-full">
                {favlen === 0 ? (
                  <div className="flex flex-row items-center justify-center">
                    <h1 className="text-rose-400">No Favorites.</h1>
                  </div>
                ) : (
                  dataFav.map((favs) => {
                    return (
                      <div className="flex flex-row w-10/12 mt-2 mb-2 min-h-20 max-h-20">
                        <div className="pl-2 pr-2 min-h-20 min-w-20 max-w-20 max-h-20">
                          {favs.post_images && (
                            <img
                              className="w-full h-full rounded-xl"
                              src={`http://localhost:5000/${favs.post_images}`}
                            />
                          )}
                        </div>
                        <div className="flex flex-row items-center justify-start w-8/12 pl-2 pr-2">
                          <Link to={`/Read Blog/${favs.post_id}`}>
                            <p className="hover:underline">{favs.post_title}</p>
                          </Link>
                        </div>
                        <div className="flex flex-row items-center justify-center pl-5">
                          <p className="text-gray-500">
                            {format(favs.favorite_time, "dd MMM yyyy")}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                {console.log(moreFav)}
                {moreFav && (
                  <div>
                    <button onClick={FavContentReq}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start w-full mt-10">
              <h1 className="flex flex-row items-center w-full pb-3 mb-10 text-2xl border border-b-gray-700 border-t-white border-l-white border-r-white">
                Likes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8 pl-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>
              </h1>
              <div className="flex flex-col items-center justify-center w-full">
                {likelen === 0 ? (
                  <div className="flex flex-row items-center justify-center">
                    <h1 className="text-green-500">No Liked Posts.</h1>
                  </div>
                ) : (
                  dataLike.map((like) => {
                    return (
                      <div className="flex flex-row w-10/12 mt-2 mb-2 min-h-20 max-h-20">
                        <div className="pl-2 pr-2 min-h-20 min-w-20 max-w-20 max-h-20">
                          {like.post_images && (
                            <img
                              className="w-full h-full rounded-xl"
                              src={`http://localhost:5000/${like.post_images}`}
                            />
                          )}
                        </div>
                        <div className="flex flex-row items-center justify-start w-8/12 pl-2 pr-2">
                          <Link to={`/Read Blog/${like.post_id}`}>
                            <p className="hover:underline">{like.post_title}</p>
                          </Link>
                        </div>
                        <div className="flex flex-row items-center justify-center pl-5">
                          <p className="text-gray-500">
                            {format(like.like_time, "dd MMM yyyy")}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}

                {moreLike && (
                  <div>
                    <button onClick={LikeContentReq}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start w-full mt-10">
              <h1 className="flex flex-row items-center w-full pb-3 mb-10 text-2xl border border-b-gray-700 border-t-white border-l-white border-r-white">
                Dislikes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8 pl-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                  />
                </svg>
              </h1>
              <div className="flex flex-col items-center justify-center w-full">
                {dislikelen === 0 ? (
                  <div className="flex flex-row items-center justify-center">
                    <h1 className="text-red-500">No DisLiked Posts.</h1>
                  </div>
                ) : (
                  dataDisLike.map((dislike) => {
                    return (
                      <div className="flex flex-row w-10/12 mt-2 mb-2 min-h-20 max-h-20">
                        <div className="pl-2 pr-2 min-h-20 min-w-20 max-w-20 max-h-20">
                          {dislike.post_images && (
                            <img
                              className="w-full h-full rounded-xl"
                              src={`http://localhost:5000/${dislike.post_images}`}
                            />
                          )}
                        </div>
                        <div className="flex flex-row items-center justify-start w-8/12 pl-2 pr-2">
                          <Link to={`/Read Blog/${dislike.post_id}`}>
                            <p className="hover:underline">
                              {dislike.post_title}
                            </p>
                          </Link>
                        </div>
                        <div className="flex flex-row items-center justify-center pl-5">
                          <p className="text-gray-500">
                            {format(dislike.like_time, "dd MMM yyyy")}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}

                {moreDislike && (
                  <div>
                    <button onClick={DisLikeContentReq}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
