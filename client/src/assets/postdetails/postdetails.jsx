import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AddIcon from "@mui/icons-material/Add";
import "./postdetails.css";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import { formatISO9075, format } from "date-fns";
import { ReactionBarSelector } from "@charkour/react-reactions";
import { YoutubeCounter } from "@charkour/react-reactions";
import TwitterLikeButton from "twitter-like-button";
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../../../hooks/useAuth";
const POSTDETAIL_URL = "/postdetails";

export const PostDetails = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  console.log(data);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(POSTDETAIL_URL, {
          id: id,
        });
        console.log(response?.data);
        setData(response?.data?.post);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  const [like, setLike] = useState(0);
  const [dislike, setDisLike] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const LikeUpdater = () => {};

  const DisLikeUpdater = () => {};

  return (
    <>
      <div>
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <h1 className="text-3xl">Turning on the lights</h1>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center w-9/12 justify-evenly">
              <h1 className="mt-10 mb-3 text-2xl font-bold text-center font-fira">
                {data.post_title}
              </h1>
              <div className="flex flex-row items-center justify-evenly">
                <p className="m-5 text-xl">
                  By{" "}
                  <Link
                    className="text-blue-400 underline"
                    to={`/${data.user_name}`}
                  >
                    {data.user_name}
                  </Link>
                </p>
                <p>{format(data.post_upload_time, "dd-MMM-yyyy HH:mm")}</p>
              </div>
              <div>
                {user.user_id === data.user_id && (
                  <Link to={`/edit/${data.post_id}`}>
                    <button className="flex flex-row items-center justify-center pt-1 pb-1 pl-3 pr-3 ml-2.5 bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-2 border-gray-800 border-solid rounded-lg ">
                      <svg
                        width={"10px"}
                        style={{ paddingRight: "5px" }}
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                  </Link>
                )}
              </div>
              <div className="flex flex-row items-center justify-center w-10/12 h-full max-md:w-full">
                <img
                  src={`http://localhost:5000/${data.post_images}`}
                  className="m-5 mb-10 rounded-xl"
                />
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: data.post_content }}
                className="text-justify"
              ></div>
              <div className="flex flex-col flex-wrap items-center w-full mt-5 justify-evenly">
                <div className="flex flex-row flex-wrap items-center justify-between w-full mt-5 mb-10 max-md:justify-center">
                  <div className="flex flex-row items-center border-2 border-gray-400 border-solid rounded-lg justify-evenly">
                    <p className="pt-2 pb-2 pl-2 pr-2 m-0 border-gray-400 border-solid border-e">
                      {data.user_name}
                    </p>
                    <Button
                      sx={{
                        borderLeft: "1.3px solid rgb(156 163 175)",
                        padding: "7px",
                        borderRadius: "0px",
                      }}
                      startIcon={<AddIcon />}
                    >
                      {" "}
                      Follow{" "}
                    </Button>
                  </div>
                  <YoutubeCounter
                    onLikeClick={() => setLike((prev) => prev + 1)}
                    onDislikeClick={() => setDisLike((prev) => prev + 1)}
                    like={like}
                    dislike={dislike}
                  />
                  <Tooltip title="Add to favorites">
                    <TwitterLikeButton
                      isLiked={favorite}
                      onClick={() => {
                        setFavorite((prev) => !prev);
                      }}
                      width={"40px"}
                      height={"40px"}
                    />
                  </Tooltip>

                  <ReactionBarSelector iconSize={"24px"} />
                </div>

                {data.post_comment_type === "true" ? (
                  <div className="flex flex-col items-start w-full m-3 mt-5 justify-evenly">
                    <h1 className="mb-3 text-2xl font-bold">24 Comments</h1>
                    <div className="flex flex-row items-center justify-center w-full mt-5 mb-5">
                      <AccountCircle
                        sx={{ color: "action.active", mr: "10px" }}
                      />
                      <input
                        style={{ width: "100%" }}
                        className="flex pt-1 pb-1 pl-2 pr-2 focus:outline-none"
                        placeholder="Add a comment..."
                      />
                      <button className="pt-1 pb-1 pl-2 pr-2 ml-2.5 bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-2 border-gray-800 border-solid rounded-lg">
                        Comment
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-center">
                    <p>Comments are disabled for this particular post</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};