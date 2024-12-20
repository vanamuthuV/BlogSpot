import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import ImageComponent from "../../../utils/ImageComponent";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DASHBOARD = "/getdashboard";

export const Dashboard = () => {
  const { user } = useAuth();

  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [datalen, setDataLen] = useState(0);
  const [moredata, setMoreData] = useState(false);
  const [preferences, setPreferences] = useState("Bookmark");

  const ReqMore = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        DASHBOARD,
        { user_id: user.user_id, preferences: preferences },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setData(response?.data?.data?.data);
      setMoreData(false);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setPreferences(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        // console.log(preferences);
        // console.log(data);
        setloading(true);
        const response = await axios.post(
          DASHBOARD,
          { user_id: localStorage.getItem("user_id"), preferences: preferences },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // console.log(response?.data?.data);
        setDataLen(response?.data?.data?.data.length);
        if (
          response?.data?.data?.data.length !== 0 &&
          response?.data?.data?.data.length > 5
        ) {
          setMoreData(true);
        }
        setData(response?.data?.data?.data.splice(0, 5));
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [preferences]);

  return (
    <div className="flex flex-row items-center justify-center mb-16">
      <div className="flex flex-col items-center justify-center w-10/12">
        <div className="flex flex-row-reverse items-center justify-between w-full mt-10 max-md:flex-col-reverse max-md:mt-5">
          <select
            value={preferences}
            onChange={handleChange}
            aria-label="Without label"
            className="p-2 text-gray-700 bg-white border-none rounded-md cursor-pointer focus:outline-none focus:ring-0"
          >
            <option value="Bookmark">Bookmarks</option>
            <option value="Likes">Likes</option>
            <option value="Dislikes">Dislikes</option>
            <option value="Favorites">Favorites</option>
          </select>

          <h1 className="text-2xl text-orange-500 max-md:mb-5">Dashboard</h1>
        </div>

        {loading ? (
          <div className="flex flex-row items-center justify-center w-full h-[calc(100vh-96px)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <circle
                fill="#F97316"
                stroke="#F97316"
                stroke-width="28"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="1.5"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin="0"
                ></animate>
              </circle>
              <circle
                fill="#F97316"
                stroke="#F97316"
                stroke-width="28"
                opacity=".8"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="1.5"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin="0.05"
                ></animate>
              </circle>
              <circle
                fill="#F97316"
                stroke="#F97316"
                stroke-width="28"
                opacity=".6"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="1.5"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin=".1"
                ></animate>
              </circle>
              <circle
                fill="#F97316"
                stroke="#F97316"
                stroke-width="28"
                opacity=".4"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="1.5"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin=".15"
                ></animate>
              </circle>
              <circle
                fill="#F97316"
                stroke="#F97316"
                stroke-width="28"
                opacity=".2"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="1.5"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin=".2"
                ></animate>
              </circle>
            </svg>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-center w-full">
            <div className="flex flex-col items-start w-full mt-10">
              <h1 className="flex flex-row items-center w-full pb-3 mb-10 text-2xl border border-b-gray-700 border-t-white border-l-white border-r-white">
                {preferences}
              </h1>
              <div className="flex flex-col items-center justify-center w-full">
                {datalen === 0 ? (
                  <div className="flex flex-row items-center justify-center">
                    <h1 className="text-rose-400">No {preferences}</h1>
                  </div>
                ) : (
                  data.map((favs) => {
                    return (
                      <div className="flex flex-row w-full py-2 mt-2 mb-2 min-h-24 max-h-24 max-md:w-full">
                        <div className="pl-2 pr-2 min-h-24 min-w-24 max-w-24 max-h-24">
                          {favs.post_images && (
                            <ImageComponent
                              base64String={favs.post_images}
                              features={"w-full h-full rounded-xl"}
                            />
                          )}
                        </div>
                        <div className="flex flex-row items-center justify-start w-full pl-2 pr-2">
                          <Link to={`/Read/${favs.post_id}`}>
                            <p className="hover:underline max-md:text-sm">
                              {favs.post_title}
                            </p>
                          </Link>
                        </div>
                        {/* <div className="flex flex-row items-center justify-center pl-5">
                              <p className="text-gray-500">
                                {format(favs.favorite_time, "dd MMM yyyy")}
                              </p>
                            </div> */}
                      </div>
                    );
                  })
                )}
                {moredata && (
                  <div>
                    <button onClick={ReqMore}>
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
