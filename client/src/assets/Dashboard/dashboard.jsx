import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import ImageComponent from "../../../utils/ImageComponent";
import { Loader } from 'lucide-react'

const DASHBOARD = "/dashboard/dashboard";

export const Dashboard = () => {
  const { user } = useAuth();

  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [datalen, setDataLen] = useState(0);
  const [moredata, setMoreData] = useState(false);
  const [preferences, setPreferences] = useState("Bookmark");
  const [bookmarks, setBookmarks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  const ReqMore = async () => {
    if (preferences === "Bookmark") {
      setData(bookmarks);
      setDataLen(bookmarks.length);
    } else if (preferences === "Likes") {
      setData(likes);
      setDataLen(likes.length);
    } else if (preferences === "Favorites") {
      setData(favorites);
      setDataLen(favorites.length);
    } else if (preferences === "Dislikes") {
      setData(dislikes);
      setDataLen(dislikes.length);
    } else {
      setData([]);
      setDataLen(0);
    }
    setMoreData(false);
  };

  const handleChange = (event) => {
    let sample;
    setPreferences(event.target.value);
    if (event.target.value === "Bookmark") {
      sample = [...bookmarks];
      setData(sample.splice(0, 5));
      setDataLen(bookmarks.length);
      setMoreData(bookmarks.length > 5);
    } else if (event.target.value === "Likes") {
      sample = [...likes];
      setData(sample.splice(0, 5));
      setDataLen(likes.length);
      setMoreData(likes.length > 5);
    } else if (event.target.value === "Favorites") {
      sample = [...favorites];
      setData(sample.splice(0, 5));
      setDataLen(favorites.length);
      setMoreData(favorites.length > 5);
    } else if (event.target.value === "Dislikes") {
      sample = [...dislikes];
      setData(sample.splice(0, 5));
      setDataLen(dislikes.length);
      setMoreData(dislikes.length > 5);
    } else {
      setData([]);
      setDataLen(0);
      setMoreData(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const response = await axios.get(DASHBOARD, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setDataLen(response?.data?.data?.bookmark.length);
        setMoreData(response?.data?.data?.bookmark.length > 5);
        const sample = [...response?.data?.data?.bookmark];
        setData(sample.splice(0, 5));
        setBookmarks(response?.data?.data?.bookmark);
        setFavorites(response?.data?.data?.favorites);
        setLikes(response?.data?.data?.likes);
        setDislikes(response?.data?.data?.dislikes);
        setloading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 mb-16 md:px-8">
      <div className="w-full max-w-5xl">
        <div className="flex flex-row-reverse items-center justify-between mt-10 max-md:flex-col-reverse max-md:gap-4">
          <select
            value={preferences}
            onChange={handleChange}
            className="p-2 text-gray-700 bg-white border rounded-md shadow focus:outline-none max-md:w-full"
          >
            <option value="Bookmark">Bookmarks</option>
            <option value="Likes">Likes</option>
            <option value="Dislikes">Dislikes</option>
            <option value="Favorites">Favorites</option>
          </select>
          <h1 className="text-2xl text-orange-500 max-md:text-center">
            Dashboard
          </h1>
        </div>
     
        {loading ? (
          <div className="flex items-center justify-center w-full h-[calc(100vh-96px)]">
            <Loader className="animate-spin" />
          </div>
        ) : (   
          <div className="flex flex-col mt-10">
            <h1 className="pb-2 mb-6 text-xl font-semibold border-b">
              {preferences}
            </h1>
            {datalen === 0 ? (
              <div className="text-center text-rose-400">No {preferences}</div>
            ) : (
              <div className="flex flex-col gap-4">
                {data.map((favs) => (
                  <div
                    key={favs.post_id}
                    className="flex items-center gap-4 p-4 border rounded-md shadow-md"
                  >
                    <div className="w-16 h-16">
                      {favs.post_images && (
                        <ImageComponent
                          base64String={favs.post_images}
                          features="w-full h-full rounded-lg"
                        />
                      )}
                    </div>
                    <Link to={`/Read/${favs.post_id}`} className="flex-grow">
                      <p className="hover:underline">{favs.post_title}</p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {moredata && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={ReqMore}
                  className="p-2 text-orange-500 bg-gray-100 border rounded-md shadow hover:bg-gray-200"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


//  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
//    <circle
//      fill="#F97316"
//      stroke="#F97316"
//      stroke-width="28"
//      r="15"
//      cx="35"
//      cy="100"
//    >
//      <animate
//        attributeName="cx"
//        calcMode="spline"
//        dur="1.5"
//        values="35;165;165;35;35"
//        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
//        repeatCount="indefinite"
//        begin="0"
//      ></animate>
//    </circle>
//    <circle
//      fill="#F97316"
//      stroke="#F97316"
//      stroke-width="28"
//      opacity=".8"
//      r="15"
//      cx="35"
//      cy="100"
//    >
//      <animate
//        attributeName="cx"
//        calcMode="spline"
//        dur="1.5"
//        values="35;165;165;35;35"
//        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
//        repeatCount="indefinite"
//        begin="0.05"
//      ></animate>
//    </circle>
//    <circle
//      fill="#F97316"
//      stroke="#F97316"
//      stroke-width="28"
//      opacity=".6"
//      r="15"
//      cx="35"
//      cy="100"
//    >
//      <animate
//        attributeName="cx"
//        calcMode="spline"
//        dur="1.5"
//        values="35;165;165;35;35"
//        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
//        repeatCount="indefinite"
//        begin=".1"
//      ></animate>
//    </circle>
//    <circle
//      fill="#F97316"
//      stroke="#F97316"
//      stroke-width="28"
//      opacity=".4"
//      r="15"
//      cx="35"
//      cy="100"
//    >
//      <animate
//        attributeName="cx"
//        calcMode="spline"
//        dur="1.5"
//        values="35;165;165;35;35"
//        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
//        repeatCount="indefinite"
//        begin=".15"
//      ></animate>
//    </circle>
//    <circle
//      fill="#F97316"
//      stroke="#F97316"
//      stroke-width="28"
//      opacity=".2"
//      r="15"
//      cx="35"
//      cy="100"
//    >
//      <animate
//        attributeName="cx"
//        calcMode="spline"
//        dur="1.5"
//        values="35;165;165;35;35"
//        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
//        repeatCount="indefinite"
//        begin=".2"
//      ></animate>
//    </circle>
//  </svg>;