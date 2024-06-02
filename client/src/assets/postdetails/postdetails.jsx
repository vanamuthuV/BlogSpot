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
import Chip from "@mui/material/Chip";
import ImageComponent from "../../../utils/ImageComponent";
import { getWhatsAppUrl } from "@phntms/react-share";
import { copyToClipboard } from "@phntms/react-share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { getTwitterUrl } from "@phntms/react-share";
import XIcon from "@mui/icons-material/X";
import { getLinkedinUrl } from "@phntms/react-share";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getFacebookUrl } from "@phntms/react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import CircularProgress from "@mui/material/CircularProgress";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const POSTDETAIL_URL = "/postdetails";
const COMMENT = "/comment";
const GETCOMMENT = "/getcomment";
const DELETEPOST = "/deletesinglepost";
const EDITCOMMENT = "/editcomment";
const DELETECOMMENT = "/deletecomment";
const CHECKFOLLOW = "/checkfollow";

export const PostDetails = () => {
  const { id } = useParams();
  const [ids, setIds] = useState(id);

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
  const [follows, setFollows] = useState([]);
  const [followLoad, setFollowLoad] = useState(true);

  const ADDBOOKMARK = "/addbookmarksingle";
  const REMOVEBOOKMARK = "/removebookmarksingle";
  const AddBookMark = async (post_id) => {
    if (Object.keys(user).length === 0) navigate("/SignUp");
    else {
      try {
        const data = {
          user_id: user.user_id,
          post_id: post_id,
        };
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        };
        const response = await axios.post(ADDBOOKMARK, data, { headers });
        // console.log(response);
        setData(response?.data?.posts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const RemoveBookMark = async (ev) => {
    // console.log("Hello");
    // console.log(ev.target.value);

    const data = {
      bookmarkid: ev.target.value,
      user_id: user.user_id,
      post_id: id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    try {
      const response = await axios.post(REMOVEBOOKMARK, data, { headers });
      setData(response?.data?.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      (async () => {
        const response = await axios.post(
          CHECKFOLLOW,
          {
            follower_id: localStorage.getItem("user_id"),
            id: id,
          },
          {
            headers: {
              "Content-Type": "application/json", // Adjust the content type as needed
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
            },
          }
        );
        // console.log(response?.data);
        setFollows(response?.data?.data);
      })();
    }
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(GETFAVORITE, {
          data: {
            user_id: localStorage.getItem("user_id"),
            post_id: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        // console.log(response?.data?.data);
        setFavoriteDetails(response?.data?.data);
        Object.keys(response?.data?.data).length === 0
          ? setFavorite(false)
          : setFavorite(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const UploadComment = async () => {
    // console.log(comment.current.value);

    if (Object.keys(user).length === 0) {
      return navigate("/SignUp");
    }

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
      // console.log(response?.data?.data);
      setComments(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (ev) => {
    // console.log(ev.target.value);
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
      // console.log(response?.data?.data);
      setComments(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReportComment = (ev) => {
    // console.log(ev.target);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // console.log("Hello");

    try {
      const response = await axios.delete(DELETEPOST + `/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // console.log(response?.data?.data);
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
        // console.log(response?.data?.data);
        setComments(response?.data?.data);
        setcommentLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);
  const [tags, setTags] = useState([]);
  // console.log(data);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(POSTDETAIL_URL, {
          id: id,
          user_id: localStorage.getItem("user_id")
        });
        console.log("Yo bRo" , response?.data);
        setData(response?.data?.post);

        // console.log(
        //   response?.data?.post?.post_tags
        //     .split("#")
        //     .splice(1, response?.data?.post?.post_tags.split("#").length)
        // );
        setTags(
          response?.data?.post?.post_tags
            .split("#")
            .splice(1, response?.data?.post?.post_tags.split("#").length)
        );
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [id]);

  const [commentID, setCommentID] = useState("");

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenEdit = (ev) => {
    setCommentID(ev.target.value);
    // console.log(ev.target.value);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const FAVORITE = "/addfavorite";
  const UNFAVORITE = "/deletefavorite";

  const handleFavorite = async () => {
    if (Object.keys(user).length === 0) {
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
        // console.log(response?.data?.data);
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
        // console.log(response?.data?.data);
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

  const [social, setSocial] = useState(false);

  useEffect(() => {
    (async () => {
      const data = {
        post_id: id,
        user_id: user.user_id,
      };

      try {
        const response = await axios.post(GETLIKES, data);
        // console.log(response?.data?.data);
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
  }, [id]);

  const LIKE = "/like";
  const DISLIKE = "/dislike";
  const DELETELIKE = "/deletelike";
  const DELETEDISLIKE = "/deletedislike";

  const LikeUpdater = async () => {
    // console.log("Like Updater!!");

    if (Object.keys(user).length === 0) {
      return navigate("/SignUp");
    }

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
        // console.log(response?.data?.data);
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
        // console.log(response?.data?.data);
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
    // console.log("Like Updater!!");

    if (Object.keys(user).length === 0) {
      return navigate("/SignUp");
    }

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
        // console.log(response?.data?.data);
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
        // console.log(response?.data?.data);
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

  const ADDFOLLOWINPOST = "/addfollowinpost";

  const LikeStyles = {
    color: "green",
    border: "none",
  };

  const DisLikeStyles = {
    color: "red",
    border: "none",
  };

  const DefaultStyles = {
    color: "#0e0a07",
    border: "none",
  };

  const [openModal, setOpenModal] = useState(false);
  const FOLLOW = "/follow";
  const UNFOLLOW = "/unfollow";
  const UnfollowHandler = async (ev) => {
    // console.log(ev.target.id);

    try {
      const response = await axios.delete(UNFOLLOW + `/${ev.target.id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
        },
      });
      setFollows(response?.data?.data);
    } catch (error) {
      console.log(error);
    }

    setOpenModal((prev) => !prev);
  };

  const FollowHandler = async () => {
    if (Object.keys(user).length === 0) return navigate("/SignUp");
    try {
      const response = await axios.post(
        ADDFOLLOWINPOST,
        {
          follower_id: user.user_id,
          following_id: data.user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        }
      );
      // console.log(response?.data?.data);
      setFollows(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (openModal) {
    return (
      <div className="flex flex-row items-center justify-center w-full h-screen bg-white">
        <div className="relative flex flex-col items-center justify-center h-40 p-5 bg-white shadow-xl w-80 rounded-xl">
          <h1>
            Are You Sure To Unfollow{" "}
            <span className="text-red-500">{data.user_name}</span> ?
          </h1>
          <button
            onClick={() => setOpenModal((prev) => !prev)}
            className="absolute top-0 right-0 flex flex-row items-center justify-center w-5 h-5 bg-red-500 rounded-tr-xl"
          >
            x
          </button>
          <div className="flex flex-row items-center justify-end w-full">
            <button
              onClick={() => setOpenModal((prev) => !prev)}
              className="pr-3 text-green-500"
            >
              Cancel
            </button>
            <button
              id={follows[0].follow_id}
              onClick={UnfollowHandler}
              className="pl-2 text-red-500"
            >
              Unfollow
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {loading ? (
          <div className="absolute flex flex-row items-center justify-center w-full h-[calc(100vh-57px)]">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col items-center w-7/12 justify-evenly max-md:w-11/12">
                <div className="flex flex-col items-start w-full">
                  <h1
                    // style={{ lineHeight: "52px" }}
                    className="mt-10 mb-5 text-5xl font-bold leading-normal max-md:text-3xl max-md:mb-1 max-md:leading-tight"
                  >
                    {data.post_title}
                  </h1>
                  <div className="relative flex flex-row items-center justify-between w-full pl-5 pr-5 mt-5 mb-10 max-md:pr-0 max-md:pl-0">
                    <div className="flex flex-row items-center justify-evenly">
                      <div className="flex flex-row items-center justify-center">
                        <div className="mr-2.5">
                          {/* <img
                        className="rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                        src={
                          data.profileimage
                            ? `http://localhost:5000/${data.profileimage}`
                            : "../../../public/Profile.jpeg"
                        }
                        /> */}
                          {data.profileimage ? (
                            <ImageComponent
                              base64String={data.profileimage}
                              features={
                                "rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                              }
                            />
                          ) : (
                            <img
                              className="rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                              src={"../../../public/Profile.jpeg"}
                            />
                          )}
                        </div>
                        <div className="flex flex-col items-start justify-center ml-2.5">
                          <div className="flex flex-row items-center ">
                            <Link to={`/${data.user_name}`}>
                              <p className="pr-2 text-base font-medium hover:underline max-md:text-sm">
                                {data.userfullname
                                  ? data.userfullname
                                  : data.user_name}
                              </p>
                            </Link>
                            {data.user_name !== user.user_name && (
                              <p>&middot;</p>
                            )}
                            {data.user_name !== user.user_name &&
                              setFollowLoad &&
                              (follows.length !== 0 ? (
                                <button
                                  onClick={() => setOpenModal((prev) => !prev)}
                                  className="pl-2 text-base text-green-600 max-md:text-sm"
                                >
                                  Following
                                </button>
                              ) : (
                                <button
                                  onClick={FollowHandler}
                                  className="pl-2 text-base text-green-600 max-md:text-sm"
                                >
                                  Follow
                                </button>
                              ))}
                          </div>
                          <div className="flex flex-row items-center justify-start w-full ">
                            <p className="pr-2 text-sm text-neutral-500 ">
                              {Math.round(
                                data.post_content.split("").length / 200
                              )}{" "}
                              min read
                            </p>
                            &middot;
                            <p className="pl-2 text-sm text-neutral-500 max-md:text-xs">
                              {format(data.post_upload_time, "MMM dd,yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                      {/* <Tooltip title="Bookmark">
                        <div>
                          {bookMark ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-6 h-6 pr-1"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6 pr-1"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                              />
                            </svg>
                          )}
                        </div>
                      </Tooltip> */}
                      <Tooltip
                        className="flex flex-row items-center justify-center"
                        title="Bookmark"
                      >
                        <div>
                          {data.is_bookmarked ? (
                            <button
                              value={data.bookmarkid}
                              onClick={RemoveBookMark}
                              className="text-orange-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 ml-4 mr-4 text-orange-500 max-md:w-4 max-md:h-4"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          ) : (
                            <button onClick={() => AddBookMark(id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 ml-4 mr-4 max-md:w-4 max-md:h-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </Tooltip>

                      {social && (
                        <div className="absolute flex flex-row items-center justify-center -top-5 max-md:-bottom-14 max-md:-right-2 max-md:top-10">
                          <Tooltip title="Whatsapp">
                            <a
                              className="pl-2 pr-2"
                              onClick={() => setSocial((prev) => !prev)}
                              href={getWhatsAppUrl({
                                url: `https://inkwellify.vercel.app/read/${data.post_id}`,
                                text: `Hey check this amazing post - `,
                              })}
                            >
                              <WhatsAppIcon />
                            </a>
                          </Tooltip>

                          <Tooltip title="Copy">
                            <div
                              className="pl-2 pr-2"
                              onClick={() => {
                                setSocial((prev) => !prev);
                                return copyToClipboard(
                                  `https://inkwellify.vercel.app/read/${data.post_id}`
                                );
                              }}
                            >
                              <ContentCopyIcon />
                            </div>
                          </Tooltip>

                          <Tooltip title="X">
                            <a
                              onClick={() => setSocial((prev) => !prev)}
                              className="pl-2 pr-2"
                              href={getTwitterUrl({
                                url: `https://inkwellify.vercel.app/read/${data.post_id}`,
                                text: `Hey check this amazing post from ${"https://inkwellify.vercel.app"}`,
                                hashtags: data.post_tags,
                                related: data.post_category,
                              })}
                            >
                              <XIcon />
                            </a>
                          </Tooltip>

                          <Tooltip title="LinkedIn">
                            <a
                              onClick={() => setSocial((prev) => !prev)}
                              className="pl-2 pr-2"
                              href={getLinkedinUrl({
                                url: `https://inkwellify.vercel.app/read/${data.post_id}`,
                                title: data.post_title,
                                source: `${"https://inkwellify.vercel.app"}`,
                              })}
                            >
                              <LinkedInIcon />
                            </a>
                          </Tooltip>

                          <Tooltip title="Facebook">
                            <a
                              className="pl-2 pr-2"
                              href={getFacebookUrl({
                                url: `https://inkwellify.vercel.app/read/${data.post_id}`,
                                hashtag: data.post_tags,
                              })}
                            >
                              <FacebookIcon />
                            </a>
                          </Tooltip>
                        </div>
                      )}

                      <Tooltip title="Share">
                        <div className="z-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 pl-1 cursor-pointer"
                            onClick={() => setSocial((prev) => !prev)}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                            />
                          </svg>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
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
                {/* <img src={`data:image/jpeg;base64,${base64String}`} alt="Image" /> */}

                <div className="flex flex-row items-center justify-center w-full h-full mb-10 max-md:w-full">
                  <ImageComponent
                    features={
                      "flex flex-row items-center justify-center w-full h-full max-md:w-full"
                    }
                    base64String={data.post_images}
                  />
                  {/* <img
                  src={`http://localhost:5000/${data.post_images}`}
                  className="mt-5 mb-10 rounded-xl"
                /> */}
                </div>

                <div className="ql-snow max-md:w-full">
                  <div
                    className="p-0 text-lg font-light text-justify ql-editor max-md:text-xs"
                    dangerouslySetInnerHTML={{ __html: data.post_content }}
                  ></div>
                </div>

                {/* <div
                dangerouslySetInnerHTML={{ __html: data.post_content }}
                className="text-lg font-light text-justify max-md:text-xs"
              ></div> */}
                <div>
                  <h1 className="mt-5 mb-5 text-2xl font-bold text-orange-500 max-md:font-normal max-md:text-lg max-md:mt-3 max-md:mb-3">
                    Summary
                  </h1>
                  <div className="ql-snow">
                    <div
                      className="p-0 text-lg font-light text-justify ql-editor max-md:text-xs"
                      dangerouslySetInnerHTML={{ __html: data.post_summary }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap items-center justify-start w-full gap-2 pt-5">
                  <p className="flex flex-row items-center justify-start text-orange-500 max-md:text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 pr-1 max-md:w-4 max-md:h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 6h.008v.008H6V6Z"
                      />
                    </svg>
                    Tags :
                  </p>
                  {tags.map((tag) => {
                    const numerics = tags.length;
                    return (
                      <p className="max-md:text-xs hover:text-orange-500">
                        {tags.indexOf(tag) === numerics - 1
                          ? `${tag}`
                          : `${tag},`}
                      </p>
                    );
                  })}
                </div>
                <div className="flex flex-col flex-wrap items-center w-full mt-5 justify-evenly">
                  <div className="flex flex-row flex-wrap items-center justify-between w-full mt-5 mb-10 max-md:justify-center">
                    <div className="flex flex-row items-center justify-center">
                      <div className="mr-2.5">
                        {/* <img
                        className="rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                        src={
                          data.profileimage
                            ? `http://localhost:5000/${data.profileimage}`
                            : "../../../public/Profile.jpeg"
                        }
                      /> */}
                        {data.profileimage ? (
                          <ImageComponent
                            features={
                              "rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                            }
                            base64String={data.profileimage}
                          />
                        ) : (
                          <img
                            className="rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                            src={"../../../public/Profile.jpeg"}
                          />
                        )}
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
                          {data.user_name !== user.user_name && <p>&middot;</p>}
                          {data.user_name !== user.user_name &&
                            setFollowLoad &&
                            (follows.length !== 0 ? (
                              <button
                                onClick={() => setOpenModal((prev) => !prev)}
                                className="pl-2 text-base text-green-600"
                              >
                                Following
                              </button>
                            ) : (
                              <button
                                onClick={FollowHandler}
                                className="pl-2 text-base text-green-600"
                              >
                                Follow
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>

                    <Tooltip title="Favorites">
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
                        <Tooltip title="Like">
                          <button
                            className="flex flex-row items-center justify-center mr-2"
                            onClick={LikeUpdater}
                            style={likeStatus ? LikeStyles : DefaultStyles}
                          >
                            {likeStatus ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-7 h-7 pr-1"
                              >
                                <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                              </svg>
                            ) : (
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
                            )}
                            {like.length}
                          </button>
                        </Tooltip>
                        <Tooltip title="Dislike">
                          <button
                            className="flex flex-row items-center justify-center ml-2"
                            onClick={DisLikeUpdater}
                            style={
                              dislikeStatus ? DisLikeStyles : DefaultStyles
                            }
                          >
                            {dislikeStatus ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-7 h-7 pr-1"
                              >
                                <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                              </svg>
                            ) : (
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
                            )}
                            {dislike.length}
                          </button>
                        </Tooltip>
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
                              {/* <img
                              className="mr-2 rounded-full min-h-10 min-w-10 max-h-10 max-w-10 max-md:max-h-8 max-md:max-w-8 max-md:min-w-8 max-md:min-h-8"
                              src={`http://localhost:5000/${user.profileimage}`}
                            /> */}
                              {user.profileimage ? (
                                <ImageComponent
                                  features={
                                    "mr-2 rounded-full min-h-10 min-w-10 max-h-10 max-w-10 max-md:max-h-8 max-md:max-w-8 max-md:min-w-8 max-md:min-h-8"
                                  }
                                  base64String={user.profileimage}
                                />
                              ) : (
                                <img
                                  className="mr-2 rounded-full min-h-10 min-w-10 max-h-10 max-w-10 max-md:max-h-8 max-md:max-w-8 max-md:min-w-8 max-md:min-h-8"
                                  src={"../../../public/Profile.jpeg"}
                                />
                              )}
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
                            className="pt-1 pb-1 pl-2 pr-2 ml-2.5 bg-orange-500 text-gray-50 hover:bg-gray-50 hover:text-orange-500 border-2 border-orange-500 border-solid rounded-lg max-md:text-xs"
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
                                    {/* <img
                                    className="rounded-full max-h-8 min-w-8 min-h-8 max-w-8"
                                    src={`http://localhost:5000/${com.profileimage}`}
                                  /> */}
                                    {com.profileimage ? (
                                      <ImageComponent
                                        features={
                                          "rounded-full max-h-8 min-w-8 min-h-8 max-w-8"
                                        }
                                        base64String={com.profileimage}
                                      />
                                    ) : (
                                      <img
                                        className="rounded-full max-h-8 min-w-8 min-h-8 max-w-8"
                                        src={"../../../public/Profile.jpeg"}
                                      />
                                    )}
                                  </Link>
                                </div>
                                <div className="flex flex-col items-start justify-center w-10/12 ml-3 mr-3 max-md:w-9/12">
                                  <div className="flex flex-row items-center justify-center">
                                    <Link to={`/${com.user_name}`}>
                                      <p className="pr-2 font-bold max-md:pr-2 max-md:text-xs hover:underline">
                                        {com.user_name}
                                      </p>
                                    </Link>

                                    <time className="flex flex-row items-center text-gray-500 max-md:text-xs">
                                      <span className="pr-2 text-xl font-bold">
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
                                              const formJson =
                                                Object.fromEntries(
                                                  formData.entries()
                                                );
                                              const newComment = formJson.email;
                                              // console.log(newComment);

                                              const data = {
                                                newComment: newComment,
                                                commentID: commentID,
                                                postID: id,
                                              };

                                              try {
                                                const response =
                                                  await axios.put(
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
                                                // console.log(
                                                //   response?.data?.data
                                                // );
                                                setComments(
                                                  response?.data?.data
                                                );
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
                                              <br></br>2. Stay on topic.
                                              <br></br> 3. No offensive language
                                              or hate speech.<br></br>
                                              5. Protect privacy avoid sharing
                                              personal information. <br></br>
                                              <br></br>Let's maintain a positive
                                              and inclusive environment for all.
                                              Non-compliance may lead to comment
                                              removal or restrictions. Your
                                              cooperation ensures an enjoyable
                                              experience for everyone. Thank you
                                              for contributing meaningfully to
                                              the [Your Blog Name] community!
                                              🌐✨
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
                    <div className="flex flex-row items-center justify-center mt-10 mb-10">
                      <p>Comments are disabled for this particular post</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
