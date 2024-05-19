import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import "../body/body.css";
import { Post } from "../body/body";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import useAuth from "../../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

const READ_URL = "/readblog";

export const PostRequester = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ClickAnalyzer, setClickAnalyzser] = useState("trending");
  const { user } = useAuth();

  useEffect(() => {
    const ReadBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.post(READ_URL, {
          type: ClickAnalyzer,
          id: user.user_id,
        });
        console.log(response?.data);
        setData(response?.data?.posts);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    ReadBlog();
  }, [ClickAnalyzer]);

  const PostType = (value) => {
    setClickAnalyzser(value);
  };

  console.log(user);

  return (
    <>
      {loading ? (
        <div className="flex flex-row items-center justify-center h-screen -mt-14">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center mt-10 mb-10 max-md:mb-5">
            <button
              onClick={() => PostType("trending")}
              className={`${
                ClickAnalyzer === "trending"
                  ? "bg-orange-500 text-gray-50 pt-1 pb-1 pl-2 pr-2 border-none rounded-md ml-3 mr-3 max-md:text-xs max-md:ml-1 max-md:mr-1 max-md:rounded-sm max-md:pr-1.5 max-md:pl-1.5"
                  : "pt-1 pb-1 pl-2 pr-2 ml-3 mr-3 text-orange-500 border border-orange-500 rounded-md max-md:text-xs max-md:ml-1 max-md:mr-1 max-md:rounded-sm max-md:pr-1.5 max-md:pl-1.5"
              }`}
            >
              Trending
            </button>
            {Object.keys(user).length !== 0 && (
              <>
                <button
                  onClick={() => PostType("network")}
                  className={`${
                    ClickAnalyzer === "network"
                      ? "bg-orange-500 text-gray-50 pt-1 pb-1 pl-2 pr-2 border-none rounded-md ml-3 mr-3 max-md:text-xs max-md:ml-1 max-md:mr-1 max-md:rounded-sm max-md:pr-1.5 max-md:pl-1.5"
                      : "pt-1 pb-1 pl-2 pr-2 ml-3 mr-3 text-orange-500 border border-orange-500 rounded-md max-md:text-xs max-md:ml-1 max-md:mr-1 max-md:rounded-sm max-md:pr-1.5 max-md:pl-1.5"
                  }`}
                >
                  Your Friend's Post
                </button>
                <button
                  onClick={() => PostType("foryou")}
                  className={`${
                    ClickAnalyzer === "foryou"
                      ? "bg-orange-500 text-gray-50 pt-1 pb-1 pl-2 pr-2 border-none rounded-md ml-3 mr-3 max-md:text-xs max-md:ml-1 max-md:mr-1 max-md:rounded-sm max-md:pr-1.5 max-md:pl-1.5"
                      : "pt-1 pb-1 pl-2 pr-2 ml-3 mr-3 text-orange-500 border border-orange-500 rounded-md max-md:text-xs max-md:ml-1 max-md:mr-1 max-md:rounded-sm max-md:pr-1.5 max-md:pl-1.5"
                  }`}
                >
                  You Might Like
                </button>
              </>
            )}

            <button
              onClick={() => PostType("new")}
              className={`${
                ClickAnalyzer === "new"
                  ? "bg-orange-500 text-gray-50 pt-1 pb-1 pl-2 pr-2 border-none rounded-md ml-3 mr-3 max-md:text-xs max-md:ml-1 max-md:mr-1 max-md:rounded-sm max-md:pr-1.5 max-md:pl-1.5"
                  : "pt-1 pb-1 pl-2 pr-2 ml-3 mr-3 text-orange-500 border border-orange-500 rounded-md max-md:text-xs max-md:ml-1 max-md:mr-1 max-md:rounded-sm max-md:pr-1.5 max-md:pl-1.5"
              }`}
            >
              Newest
            </button>
          </div>
          {ClickAnalyzer === "network" && data.length === 0 && (
            <p className={`mt-5 mb-5 text-lg text-red-600`}>
              Your are not following anyone, To see post please build your
              connections.
            </p>
          )}
          {data.map((post) => (
            <Post {...post} />
          ))}
          {ClickAnalyzer === "foryou" && (
            <div className="flex flex-row items-center justify-center h-96">
              <p className="text-2xl text-orange-500">Coming Soon</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
