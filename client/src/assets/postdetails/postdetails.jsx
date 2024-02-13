import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./postdetails.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { formatISO9075, format } from "date-fns";
import { ReactionBarSelector } from "@charkour/react-reactions";
import TwitterLikeButton from "twitter-like-button";
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRef } from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import EditIcon from "@mui/icons-material/Edit";
import { useStepContext } from "@mui/material";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const POSTDETAIL_URL = "/postdetails";
const COMMENT = "/comment";
const GETCOMMENT = "/getcomment";
const DELETEPOST = "/deletesinglepost";
const EDITCOMMENT = "/editcomment";
const DELETECOMMENT = "/deletecomment";

export const PostDetails = () => {
  const { id } = useParams();
  const [commentLoading, setcommentLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const [option, setOption] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const navigate = useNavigate();

  const comment = useRef(null);

  const GETFAVORITE = "/getfavorite";

  const [favorite, setFavorite] = useState();
  const [favoriteDeatails, setFavoriteDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(GETFAVORITE, {
          data: {
            user_id: user.user_id,
            post_id: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
        setFavoriteDetails(response?.data?.data);
        Object.keys(response?.data?.data).length === 0
          ? setFavorite(false)
          : setFavorite(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const UploadComment = async () => {
    console.log(comment.current.value);

    const data = {
      comment: comment.current.value,
      user_id: user.user_id,
      post_id: id,
    };

    comment.current.value = "";

    try {
      const response = await axios.post(COMMENT, {
        data,
        headers: {
          "Content-Type": "multipart/form-data", // Adjust the content type as needed
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
        },
      });
      console.log(response?.data?.data);
      setComments(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (ev) => {
    console.log(ev.target.value);
    const commentid = ev.target.value;

    try {
      const response = await axios.delete(
        DELETECOMMENT + "/" + commentid + "-." + id,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Adjust the content type as needed
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        }
      );
      console.log(response?.data?.data);
      setComments(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReportComment = (ev) => {
    console.log(ev.target);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log("Hello");

    try {
      const response = await axios.delete(DELETEPOST + `/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data?.data);
    } catch (error) {
      console.error(error);
    }

    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(GETCOMMENT, { id });
        console.log(response?.data?.data);
        setComments(response?.data?.data);
        setcommentLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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

  const [commentID, setCommentID] = useState("");

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenEdit = (ev) => {
    setCommentID(ev.target.value);
    console.log(ev.target.value);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const FAVORITE = "/addfavorite";
  const UNFAVORITE = "/deletefavorite";

  const handleFavorite = async () => {
    if (!user.user_id) {
      return navigate("/SignUp");
    }

    if (favorite === true) {
      try {
        const response = await axios.delete(
          UNFAVORITE + `/${favoriteDeatails.favorite_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response?.data?.data);
        setFavoriteDetails(response?.data?.data);
        setFavorite(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(FAVORITE, {
          data: {
            user_id: user.user_id,
            post_id: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
        setFavoriteDetails(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
      setFavorite(true);
    }
  };

  const GETLIKES = "/getlikes";

  const [likeinfo, setLikeInfo] = useState({});
  const [like, setLike] = useState([]);
  const [dislike, setDisLike] = useState([]);
  const [likeStatus, setLikestatus] = useState();
  const [dislikeStatus, setDislikeStatus] = useState();
  const [likeloading, setlikeloading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = {
        post_id: id,
        user_id: user.user_id,
      };

      try {
        const response = await axios.post(GETLIKES, data);
        console.log(response?.data?.data);
        setDislikeStatus(response?.data?.data?.Like?.dislikes);
        setLikestatus(response?.data?.data?.Like?.likes);
        setLikeInfo(response?.data?.data?.Like);
        setLike(response?.data?.data?.TotalLike);
        setDisLike(response?.data?.data?.TotalDisLike);
        setlikeloading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const LIKE = "/like";
  const DISLIKE = "/dislike";
  const DELETELIKE = "/deletelike";
  const DELETEDISLIKE = "/deletedislike";

  const LikeUpdater = async () => {
    console.log("Like Updater!!");

    const data = {
      post_id: id,
      user_id: user.user_id,
    };

    if (likeStatus === true) {
      try {
        const response = await axios.delete(
          DELETELIKE + `/${likeinfo.like_id}..${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response?.data?.data);
        setLikestatus(false);
        setDislikeStatus(false);
        setLikeInfo({});
        setLike(response?.data?.data?.TotalLike);
        setDisLike(response?.data?.data?.TotalDisLike);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(LIKE, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
        setLikestatus(response?.data?.data?.Like?.likes);
        setDislikeStatus(response?.data?.data?.Like?.dislikes);
        setLikeInfo(response?.data?.data?.Like);
        setLike(response?.data?.data?.TotalLike);
        setDisLike(response?.data?.data?.TotalDisLike);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const DisLikeUpdater = async () => {
    console.log("Like Updater!!");

    const data = {
      post_id: id,
      user_id: user.user_id,
    };

    if (dislikeStatus === true) {
      try {
        const response = await axios.delete(
          DELETEDISLIKE + `/${likeinfo.like_id}..${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response?.data?.data);
        setLikestatus(false);
        setDislikeStatus(false);
        setLikeInfo({});
        setLike(response?.data?.data?.TotalLike);
        setDisLike(response?.data?.data?.TotalDisLike);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(DISLIKE, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
        setLikestatus(response?.data?.data?.Like?.likes);
        setDislikeStatus(response?.data?.data?.Like?.dislikes);
        setLikeInfo(response?.data?.data?.Like);
        setLike(response?.data?.data?.TotalLike);
        setDisLike(response?.data?.data?.TotalDisLike);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const Styles = {
    backgroundColor: "#303030",
    color: "#f5f5f5",
    border: "none",
  };

  return (
    <>
      <div>
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <h1 className="text-3xl">Turning on the lights</h1>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center w-7/12 justify-evenly">
              <div className="flex flex-col items-start w-full">
                <h1
                  style={{ fontSize: "42px", lineHeight: "52px" }}
                  className="mt-10 mb-5 font-bold max-md:text-base max-md:mb-1"
                >
                  {data.post_title}
                </h1>
                <div className="flex flex-row items-center mt-5 mb-10 justify-evenly">
                  <div className="flex flex-row items-center justify-center">
                    <div className="mr-2.5">
                      <img
                        className="rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                        src={
                          data.profileimage
                            ? `http://localhost:5000/${data.profileimage}`
                            : "../../../public/Profile.jpeg"
                        }
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center ml-2.5">
                      <div className="flex flex-row items-center ">
                        <Link to={`/${data.user_name}`}>
                          <p className="pr-2 text-base font-medium hover:underline">
                            {data.userfullname
                              ? data.userfullname
                              : data.user_name}
                          </p>
                        </Link>
                        &middot;
                        {data.user_name !== user.user_name && (
                          <button className="pl-2 text-base text-green-600">
                            Follow
                          </button>
                        )}
                      </div>
                      <div className="flex flex-row items-center justify-start w-full ">
                        <p className="pr-2 text-sm text-neutral-500">
                          {Math.round(data.post_content.split("").length / 200)}{" "}
                          min read
                        </p>
                        &middot;
                        <p className="pl-2 text-sm text-neutral-500">
                          {format(data.post_upload_time, "MMM dd,yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {user.user_id === data.user_id && (
                  <Link to={`/edit/${data.post_id}`}>
                    <button className="flex flex-row items-center justify-center pt-1 pb-1 pl-3 pr-3 ml-2.5 bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-2 border-gray-800 border-solid rounded-lg max-md:text-xs">
                      <svg
                        width={"10px"}
                        style={{ paddingRight: "5px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 max-md:w-4 max-md:h-4"
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
              <div className="flex flex-row items-center justify-center w-full h-full max-md:w-full">
                <img
                  src={`http://localhost:5000/${data.post_images}`}
                  className="mt-5 mb-10 rounded-xl"
                />
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: data.post_content }}
                className="text-lg text-justify max-md:text-xs"
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

                  <Tooltip title="Add to favorites">
                    <TwitterLikeButton
                      isLiked={favorite}
                      onClick={handleFavorite}
                      width={"40px"}
                      height={"40px"}
                    />
                  </Tooltip>

                  {likeloading ? (
                    <div>
                      <h1>Loading...</h1>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center justify-center">
                      <button
                        className="flex flex-row items-center justify-center pt-1 pb-1 pl-2 pr-2 mr-2 border-2 border-gray-500 rounded-full"
                        onClick={LikeUpdater}
                        style={likeStatus ? Styles : {}}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-7 h-7 pr-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                          />
                        </svg>
                        Like
                      </button>
                      <p className="pl-1 text-xl">{like.length}</p>
                      <button
                        className="flex flex-row items-center justify-center pt-1 pb-1 pl-2 pr-2 ml-2 border-2 border-gray-500 rounded-full"
                        onClick={DisLikeUpdater}
                        style={dislikeStatus ? Styles : {}}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-7 h-7 pr-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                          />
                        </svg>
                        DisLike
                      </button>
                      <p className="pl-3 text-xl">{dislike.length}</p>
                    </div>
                  )}
                </div>

                {user.user_id === data.user_id && (
                  <div>
                    <button
                      className="pt-2 pb-2 pl-5 pr-5 font-light text-white transition duration-300 bg-red-600 border border-red-600 rounded-lg hover:text-red-600 hover:bg-white active:text-red-600 active:bg-white max-md:text-xs"
                      onClick={handleClickOpen}
                    >
                      Delete This Post
                    </button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        style={{ fontFamily: "Space Mono" }}
                      >
                        {"Are you sure you want to delete the post?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          style={{
                            fontFamily: "Space Mono",
                            textAlign: "justify",
                          }}
                          id="alert-dialog-description"
                        >
                          This action cannot be undone, and the post will be
                          permanently removed. Please confirm your decision
                          before proceeding. If you have any concerns or need
                          assistance, feel free to let us know.
                          <span className="font-bold">
                            Post Title : {data.post_title}
                          </span>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          style={{ fontFamily: "Space Mono" }}
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          style={{
                            fontFamily: "Space Mono",
                            color: "red",
                          }}
                          // onClick={() => {
                          //   handleDeletePost(deleteID);
                          // }}
                          onClick={handleDelete}
                          autoFocus
                        >
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )}

                {data.post_comment_type === "true" ? (
                  <div className="flex flex-col items-start justify-center w-full mt-5">
                    <div className="flex flex-col items-start w-full mt-5 justify-evenly">
                      <h1 className="mb-3 text-2xl font-bold max-md:text-lg">
                        {comments.length === 0 ? "No" : comments.length}{" "}
                        Comments
                      </h1>
                      <div className="flex flex-row items-center justify-center w-full mt-5 mb-5">
                        {Object.keys(user).length === 0 ? (
                          <AccountCircle
                            fontSize="large"
                            sx={{ color: "action.active", mr: "10px" }}
                          />
                        ) : (
                          <Link to={`/${user.user_name}`}>
                            <img
                              className="mr-2 rounded-full min-h-10 min-w-10 max-h-10 max-w-10 max-md:max-h-8 max-md:max-w-8 max-md:min-w-8 max-md:min-h-8"
                              src={`http://localhost:5000/${user.profileimage}`}
                            />
                          </Link>
                        )}

                        {/* <AccountCircle
                          fontSize="large"
                          sx={{ color: "action.active", mr: "10px" }}
                        /> }
                        {/* <input
                            ref={comment}
                          className="flex w-full pt-3 pb-3 pl-2 pr-2 "
                            placeholder="Add a comment..."
                        /> */}
                        <TextField
                          id="standard-textarea"
                          inputRef={comment}
                          sx={{ width: "100%", fontFamily: "Space Mono" }}
                          placeholder="Leave a comment..."
                          multiline
                          variant="standard"
                        />
                        <button
                          onClick={UploadComment}
                          className="pt-1 pb-1 pl-2 pr-2 ml-2.5 bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-2 border-gray-800 border-solid rounded-lg max-md:text-xs"
                        >
                          Comment
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full mt-3 mb-10">
                      {commentLoading ? (
                        <h1>Loading...</h1>
                      ) : comments.length === 0 ? (
                        <p className="max-md:text-sm">No Comments Yet</p>
                      ) : (
                        comments.map((com) => {
                          return (
                            <div className="flex flex-row items-center justify-between w-full mt-2 mb-2">
                              <div className="flex flex-row items-start justify-center w-1/12">
                                {/* <AccountCircle
                                  fontSize="large"
                                  sx={{ color: "action.active" }}
                                /> */}
                                <Link to={`/${com.user_name}`}>
                                  <img
                                    className="rounded-full max-h-8 min-w-8 min-h-8 max-w-8"
                                    src={`http://localhost:5000/${com.profileimage}`}
                                  />
                                </Link>
                              </div>
                              <div className="flex flex-col items-start justify-center w-10/12 ml-3 mr-3 max-md:w-9/12">
                                <div className="flex flex-row items-center justify-center">
                                  <Link to={`/${com.user_name}`}>
                                    <p className="pr-5 font-bold max-md:pr-2 max-md:text-xs hover:underline">
                                      {com.user_name}
                                    </p>
                                  </Link>

                                  <time className="flex flex-row items-center pl-5 text-gray-500 max-md:pl-2 max-md:text-xs">
                                    <span className="text-xl font-bold">
                                      &middot;
                                    </span>
                                    {
                                      <ReactTimeAgo
                                        date={com.comment_time}
                                        locale="en-IN"
                                      />
                                    }
                                  </time>
                                  {com.isedited === true && (
                                    <p className="flex flex-row items-center pl-5 text-gray-700 max-md:pl-2 max-md:text-xs">
                                      <svg
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
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                        />
                                      </svg>
                                      edited
                                    </p>
                                  )}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                  <p className="max-md:text-xs">
                                    {com.comment}
                                  </p>
                                </div>
                              </div>

                              {Object.keys(user).length !== 0 && (
                                <div className="relative flex flex-row items-center justify-center w-1/12">
                                  {com.user_id === user.user_id && (
                                    <>
                                      <button
                                        onClick={handleClickOpenEdit}
                                        value={com.comment_id}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          class="w-8 h-8 pl-1 pr-1 max-md:w-5 max-md:h-5 max-md:pr-0.5 max-md:pl-0.5"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                          />
                                        </svg>
                                      </button>
                                      <Dialog
                                        open={openEdit}
                                        onClose={handleCloseEdit}
                                        PaperProps={{
                                          component: "form",
                                          onSubmit: async (event) => {
                                            event.preventDefault();
                                            const formData = new FormData(
                                              event.currentTarget
                                            );
                                            const formJson = Object.fromEntries(
                                              formData.entries()
                                            );
                                            const newComment = formJson.email;
                                            console.log(newComment);

                                            const data = {
                                              newComment: newComment,
                                              commentID: commentID,
                                              postID: id,
                                            };

                                            try {
                                              const response = await axios.put(
                                                EDITCOMMENT,
                                                data,
                                                {
                                                  headers: {
                                                    "Content-Type":
                                                      "application/json",
                                                    Authorization: `Bearer ${localStorage.getItem(
                                                      "accessToken"
                                                    )}`,
                                                  },
                                                }
                                              );
                                              console.log(response?.data?.data);
                                              setComments(response?.data?.data);
                                            } catch (error) {
                                              console.log(error);
                                            }

                                            handleCloseEdit();
                                          },
                                        }}
                                      >
                                        <DialogTitle
                                          sx={{ fontFamily: "Space Mono" }}
                                        >
                                          Editting Comment
                                        </DialogTitle>
                                        <DialogContent>
                                          <DialogContentText
                                            sx={{
                                              fontFamily: "Space Mono",
                                              fontSize: "10px",
                                            }}
                                          >
                                            🚨 Attention INKWELLIFY Community!{" "}
                                            <br></br>🚨 Respectful and
                                            constructive dialogue is vital.
                                            Please adhere to guidelines:
                                            <br></br> 1. Be respectful.{" "}
                                            <br></br>2. Stay on topic.<br></br>{" "}
                                            3. No offensive language or hate
                                            speech.<br></br>
                                            5. Protect privacy avoid sharing
                                            personal information. <br></br>
                                            <br></br>Let's maintain a positive
                                            and inclusive environment for all.
                                            Non-compliance may lead to comment
                                            removal or restrictions. Your
                                            cooperation ensures an enjoyable
                                            experience for everyone. Thank you
                                            for contributing meaningfully to the
                                            [Your Blog Name] community! 🌐✨
                                          </DialogContentText>
                                          <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="name"
                                            name="email"
                                            label="Write Your New Comment"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            sx={{ fontFamily: "Space Mono" }}
                                          />
                                        </DialogContent>
                                        <DialogActions>
                                          <Button
                                            sx={{ fontFamily: "Space Mono" }}
                                            onClick={handleCloseEdit}
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            sx={{ fontFamily: "Space Mono" }}
                                            type="submit"
                                          >
                                            Comment
                                          </Button>
                                        </DialogActions>
                                      </Dialog>
                                    </>
                                  )}

                                  {(com.user_id === user.user_id ||
                                    data.user_id === user.user_id) && (
                                    <button
                                      onClick={handleDeleteComment}
                                      value={com.comment_id}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-8 h-8 pl-1 pr-1 max-md:w-5 max-md:h-5 max-md:pr-0.5 max-md:pl-0.5 text-red-500"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </button>
                                  )}

                                  {!(
                                    com.user_id === user.user_id ||
                                    data.user_id === user.user_id
                                  ) && (
                                    <button
                                      onClick={handleReportComment}
                                      values={com.comment_id}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-8 h-8 pl-1 pr-1 max-md:w-5 max-md:h-5 max-md:pr-0.5 max-md:pl-0.5"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                        />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
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
