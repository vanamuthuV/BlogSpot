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
import img from "../../../public/Profile.jpeg";
import { useSnackbarContext } from "../../context/snackProvider";
import { Loader } from "lucide-react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Helmet } from "react-helmet";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const POSTDETAIL_URL = "/post/post";
const COMMENT = "/comment/comment";
const GETCOMMENT = "/comment/comment";
const DELETEPOST = "/deletesinglepost";
const EDITCOMMENT = "/editcomment";
const DELETECOMMENT = "/deletecomment";
const CHECKFOLLOW = "/follow/follow/check";
const ADDBOOKMARK = "/bookmark/bookmark";
const REMOVEBOOKMARK = "/bookmark/bookmark";
const FOLLOW = "/follow/follow";
const UNFOLLOW = "/follow/follow";
const GETFAVORITE = "/favorite/favorite";
const FAVORITE = "/favorite/favorite";
const LIKE = "/likes/likes";
const DISLIKE = "/likes/dislikes";
const GETLIKES = "/likes/likes";
const IMAGE = "/post/postimg";

export const PostDetails = () => {
  const { id } = useParams();

  const [commentLoading, setcommentLoading] = useState(true);
  const [followloading, setFollowLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const [option, setOption] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const comment = useRef(null);
  const [image, setImage] = useState({
    post_images: undefined,
    profileimage: undefined,
  });
  const [favorite, setFavorite] = useState();
  const [favoriteDeatails, setFavoriteDetails] = useState({});
  const [follows, setFollows] = useState([]);
  const { showSnackbar } = useSnackbarContext();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeStatus, setLikeStatus] = useState(null);
  const [likevalue, setLikevalue] = useState({});
  const [favloading, setFavLoading] = useState(true);
  const [likeinfo, setLikeInfo] = useState({});
  const [like, setLike] = useState([]);
  const [dislike, setDisLike] = useState([]);
  const [likestatus, setLikestatus] = useState();
  const [dislikeStatus, setDislikeStatus] = useState();
  const [likeloading, setlikeloading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [social, setSocial] = useState(false);
  const [commentID, setCommentID] = useState("");
  const [openEdit, setOpenEdit] = React.useState(false);

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

  console.log(data);

  const AddBookMark = async (post_id) => {
    if (Object.keys(user).length === 0) navigate("/SignUp");
    else {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        };
        const response = await axios.post(`${ADDBOOKMARK}/${post_id}`, {
          headers,
        });
        console.log(response?.data?.data);

        setData({
          ...data,
          is_bookmarked: true,
          bookmarkid: response?.data?.data,
        });
        showSnackbar(response?.data?.message, response?.data?.success);
      } catch (error) {
        console.log(error);
        showSnackbar(
          error?.response?.data?.message,
          error?.response?.data?.success
        );
      }
    }
  };

  const RemoveBookMark = async (ev) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    try {
      const response = await axios.delete(
        `${REMOVEBOOKMARK}/${ev.target.value}`,
        { headers }
      );
      console.log(response?.data?.data);
      // setData(response?.data?.posts);
      showSnackbar(response?.data?.message, response?.data?.success);
      setData({ ...data, is_bookmarked: false, bookmarkid: undefined });
    } catch (error) {
      console.log(error);
      showSnackbar(
        error?.response?.data?.message,
        error?.response?.data?.success
      );
    }
  };

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setFollowLoading(true);
      (async () => {
        const response = await axios.get(`${CHECKFOLLOW}/${data?.user_id}`, {
          headers: {
            "Content-Type": "application/json", // Adjust the content type as needed
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        });
        console.log(response?.data);
        setFollows(response?.data?.data);
        setFollowLoading(false);
      })();
    }
  }, [id, user.user_id, data.user_id]);

  useEffect(() => {
    (async () => {
      try {
        setFavLoading(true);
        const response = await axios.get(
          `${GETFAVORITE}/${id}/${user.user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response?.data?.data);
        setFavoriteDetails(response?.data?.data);
        Object.keys(response?.data?.data).length === 0
          ? setFavorite(false)
          : setFavorite(true);
        setFavLoading(false);
      } catch (error) {
        console.log(error);
        setFavLoading(false);
      }
    })();
  }, [id, user.user_id]);

  const UploadComment = async () => {
    if (Object.keys(user).length === 0) {
      return navigate("/SignUp");
    }

    const data = {
      comment: comment.current.value,
    };

    comment.current.value = "";

    try {
      const response = await axios.post(`${COMMENT}/${id}`, data, {
        headers: {
          "Content-Type": "application/json", // Adjust the content type as needed
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
        },
      });
      setComments((prev) => {
        const newarray = [...prev]; // Spread to avoid direct mutation
        newarray.unshift({
          ...response?.data?.data,
          user_name: user.user_name,
          profileimage: user.profileimage,
        });
        return newarray;
      });

      showSnackbar(response?.data?.message, response?.data?.success);
    } catch (error) {
      console.error(error);
      showSnackbar(error?.response?.data?.message, false);
    }
  };

  const handleDeleteComment = async (ev) => {
    const commentid = ev.target.value;
    try {
      const response = await axios.delete(`${COMMENT}/${commentid}`, {
        headers: {
          "Content-Type": "application/json", // Adjust the content type as needed
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
        },
      });
      setComments((prev) => {
        const newarray = prev.filter((com) => com.comment_id !== commentid);
        return newarray;
      });

      showSnackbar(response?.data?.message, response?.data?.success);
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, false);
    }
  };

  const handleReportComment = (ev) => {
    // console.log(ev.target);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/post/post/${post_id}/${user.user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response?.data?.success) {
        showSnackbar(response?.data?.message, response?.data?.success);
        navigate("/");
      } else {
        showSnackbar(response?.data?.message, false);
      }
    } catch (error) {
      console.error(error);
      showSnackbar(error.response?.data?.message, false);
    }

    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        setcommentLoading(true);
        const response = await axios.get(`${GETCOMMENT}/${id}`);
        console.log(response?.data?.data);
        setComments(response?.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setcommentLoading(false);
      }
    })();
  }, [id]);
  const [tags, setTags] = useState([]);
  // console.log(data);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${POSTDETAIL_URL}/${id}`,
          {
            user_id: localStorage.getItem("user_id"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("Yo bRo", response?.data?.data[0]);
        setData(response?.data?.data[0]);
        setTags(
          response?.data?.data[0]?.post_tags
            .split(",")
            .splice(1, response?.data?.post?.post_tags.split("#").length)
        );
        setLoading(false);
        const img = await axios.get(`${IMAGE}/${id}`);
        setImage(img.data?.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
        showSnackbar(
          error?.response?.data?.message,
          error?.response?.data?.success
        );
      }
    })();
  }, [id]);

  const handleClickOpenEdit = (ev) => {
    setCommentID(ev.target.value);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleFavorite = async () => {
    if (Object.keys(user).length === 0) {
      return navigate("/SignUp");
    }
    console.log(favoriteDeatails);
    if (favorite === true) {
      try {
        const response = await axios.delete(
          FAVORITE + `/${favoriteDeatails.favorite_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // console.log(response?.data?.data);
        setFavoriteDetails({});
        setFavorite(false);
        showSnackbar(response?.data?.message, response?.data.success);
      } catch (error) {
        console.log(error);
        showSnackbar(error?.response?.data?.message, false);
      }
    } else {
      try {
        const response = await axios.post(`${FAVORITE}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
        setFavoriteDetails(response?.data?.data);
        setFavorite(true);
        showSnackbar(response?.data?.message, response?.data.success);
      } catch (error) {
        console.log(error);
        showSnackbar(error?.response?.data?.message, false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setlikeloading(true);
        const response = await axios.get(`${GETLIKES}/${id}`);
        const newArray = response?.data?.data;
        const foundLike = newArray.find((lik) => lik.user_id === user.user_id);
        if (foundLike) {
          console.log("Yeah We Found You", foundLike);
          setLikevalue(foundLike);
          console.log(!!foundLike.likes);
          setLikeStatus(!!foundLike.likes);
        } else {
          setLikeStatus(null);
        }
        const likesCount = newArray.filter((lik) => lik.likes === true).length;
        const dislikesCount = newArray.filter(
          (lik) => lik.likes === false
        ).length;
        setLikes(likesCount);
        setDislikes(dislikesCount);
        setlikeloading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, user.user_id]);

  const LikeUpdater = async (ev) => {
    if (Object.keys(user).length === 0) {
      return navigate("/SignUp");
    }

    const data = {
      post_id: id,
      like_id: ev.target.value,
      is_update: likeStatus === false,
    };

    try {
      const response = await axios.post(LIKE, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data);
      if (response?.data?.success) {
        if (response?.data?.data) {
          if (data.is_update) {
            setLikes((prev) => prev + 1);
            setLikevalue(response?.data?.data[0]);
            setLikeStatus(true);
            setDislikes((prev) => prev - 1);
          } else {
            console.log("I will");
            setLikes((prev) => prev + 1);
            setLikevalue(response?.data?.data[0]);
            setLikeStatus(true);
          }
        } else {
          setLikes((prev) => prev - 1);
          setLikevalue({});
          setLikeStatus(null);
        }
      }
      showSnackbar(response?.data?.message, response?.data?.success);
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, false);
    }
  };

  const DisLikeUpdater = async (ev) => {
    // console.log("Like Updater!!");

    if (Object.keys(user).length === 0) {
      return navigate("/SignUp");
    }

    const data = {
      post_id: id,
      like_id: ev.target.value,
      is_update: likeStatus === true,
    };

    try {
      const response = await axios.post(DISLIKE, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data);
      if (response?.data?.success) {
        if (response?.data?.data) {
          if (data.is_update) {
            setDislikes((prev) => prev + 1);
            setLikevalue(response?.data?.data[0]);
            setLikeStatus(false);
            setLikes((prev) => prev - 1);
          } else {
            setDislikes((prev) => prev + 1);
            setLikevalue(response?.data?.data[0]);
            setLikeStatus(false);
          }
        } else {
          setDislikes((prev) => prev - 1);
          setLikevalue({});
          setLikeStatus(null);
        }
      }
      showSnackbar(response?.data?.message, response?.data?.success);
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, false);
    }
  };

  const UnfollowHandler = async (ev) => {
    try {
      const response = await axios.delete(UNFOLLOW + `/${ev.target.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
        },
      });
      if (response?.data?.success) {
        setFollows([]);
        showSnackbar(response?.data?.message, response?.data?.success);
      }
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, false);
    }

    setOpenModal((prev) => !prev);
  };

  const FollowHandler = async () => {
    if (Object.keys(user).length === 0) return navigate("/SignUp");
    try {
      const response = await axios.post(`${FOLLOW}/${data.user_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
        },
      });
      // console.log(response?.data?.data);
      if (response?.data?.success) {
        setFollows(response?.data?.data);
        showSnackbar(response?.data?.message, response?.data?.success);
      }
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, false);
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
          <div className="flex flex-row items-center justify-center w-full h-screen">
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
          <>
            <Helmet>
              <script type="application/ld+json">
                {`
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${data.post_title}",
        "description": "${data.post_summary}",
        "url": "https://inkwellify.vercel.app/Read/${data.post_title
          .replace(/[^a-zA-Z0-9\s-]/g, "")
          .replace(/\s+/g, "-")}/${data.post_id}",
        "author": {
          "@type": "Person",
          "name": "${data.user_name}"
        },
        "datePublished": "${data.post_upload_time}",
        "dateModified": "${data.post_upload_time}"
      }
    `}
              </script>

              <title>{data.post_title}</title>
              <meta name="description" content={data.post_summary} />
              <meta property="og:title" content={data.title} />
              <meta property="og:description" content={data.description} />
              <meta
                property="og:image"
                content={`data:image/png;base64,${data.post_images}`}
              />
            </Helmet>
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
                          {image.profileimage ? (
                            <ImageComponent
                              base64String={image.profileimage}
                              features={
                                "rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                              }
                            />
                          ) : (
                            <img
                              className="rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                              src={img}
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
                            {data.user_id !== user.user_id && <p>&middot;</p>}
                            {data.user_id !== user.user_id ? (
                              followloading ? (
                                <Loader className="w-4 h-4 ml-2 animate-spin" />
                              ) : follows.length !== 0 ? (
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
                              )
                            ) : null}
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
                                url: `https://inkwellify.vercel.app/Read/${data.post_title
                                  .replace(/[^a-zA-Z0-9\s-]/g, "")
                                  .replace(/\s+/g, "-")}/${data.post_id}}`,
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
                                  `https://inkwellify.vercel.app/Read/${data.post_title
                                    .replace(/[^a-zA-Z0-9\s-]/g, "")
                                    .replace(/\s+/g, "-")}/${data.post_id}`
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
                                url: `https://inkwellify.vercel.app/Read/${data.post_title
                                  .replace(/[^a-zA-Z0-9\s-]/g, "")
                                  .replace(/\s+/g, "-")}/${data.post_id}`,
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
                                url: `https://inkwellify.vercel.app/Read/${data.post_title
                                  .replace(/[^a-zA-Z0-9\s-]/g, "")
                                  .replace(/\s+/g, "-")}/${data.post_id}`,
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
                                url: `https://inkwellify.vercel.app/Read/${data.post_title
                                  .replace(/[^a-zA-Z0-9\s-]/g, "")
                                  .replace(/\s+/g, "-")}/${data.post_id}`,
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
                  {image.post_images ? (
                    <ImageComponent
                      features={
                        "flex flex-row items-center justify-center w-full h-full max-md:w-full"
                      }
                      base64String={image.post_images}
                    />
                  ) : (
                    <div class="w-full h-96 bg-white rounded-lg overflow-hidden">
                      <div class="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                    </div>
                  )}
                </div>

                <div className="ql-snow">
                  <div className="content-container">
                    <div
                      className="ql-editor"
                      dangerouslySetInnerHTML={{ __html: data.post_content }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h1 className="mt-5 mb-5 text-2xl font-bold text-orange-500 max-md:font-normal max-md:text-lg max-md:mt-3 max-md:mb-3">
                    Summary
                  </h1>
                  <p>{data.post_summary}</p>
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
                        {image.profileimage ? (
                          <ImageComponent
                            features={
                              "rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                            }
                            base64String={image.profileimage}
                          />
                        ) : (
                          <img
                            className="rounded-full min-w-11 min-h-11 max-h-11 max-w-11"
                            src={img}
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
                          {data.user_id !== user.user_id && <p>&middot;</p>}
                          {data.user_id !== user.user_id ? (
                            followloading ? (
                              <Loader className="w-4 h-4 ml-2 animate-spin" />
                            ) : follows.length !== 0 ? (
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
                            )
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <Tooltip title="Favorites">
                      {favloading ? (
                        <Loader className="w-4 h-4 ml-2 animate-spin" />
                      ) : (
                        <TwitterLikeButton
                          isLiked={favorite}
                          onClick={handleFavorite}
                          width={"40px"}
                          height={"40px"}
                        />
                      )}
                    </Tooltip>

                    {likeloading ? (
                      <div className="flex flex-row items-center justify-center">
                        <Loader className="animate-spin" />
                      </div>
                    ) : (
                      <div className="flex flex-row items-center justify-center">
                        <Tooltip title="Like">
                          <button
                            className="flex flex-row items-center justify-center mr-2"
                            onClick={LikeUpdater}
                            value={likevalue.like_id}
                          >
                            <ThumbsUp
                              absoluteStrokeWidth={false}
                              className={
                                likeStatus === true
                                  ? "fill-green-500 stroke-none w-6 h-6" // Green fill, no border
                                  : "fill-none stroke-black w-5 h-5" // No fill, gray border
                              }
                            />
                            <span className="ml-1 text-lg text-green-500">
                              {likes}
                            </span>
                          </button>
                        </Tooltip>
                        <Tooltip title="Dislike">
                          <button
                            className="flex flex-row items-center justify-center ml-2"
                            onClick={DisLikeUpdater}
                            value={likevalue.like_id}
                          >
                            <ThumbsDown
                              absoluteStrokeWidth={false}
                              className={
                                likeStatus === false
                                  ? "fill-red-500 stroke-none w-6 h-6" // Green fill, no border
                                  : "fill-none stroke-black w-5 h-5" // No fill, gray border
                              }
                            />
                            <span className="ml-1 text-lg text-red-500">
                              {dislikes}
                            </span>
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
                                  src={img}
                                />
                              )}
                            </Link>
                          )}

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
                          <div className="flex flex-row items-center justify-center">
                            <Loader className="animate-spin" />
                          </div>
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
                                        src={img}
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

                                              const data = {
                                                newComment: newComment,
                                              };

                                              try {
                                                const response =
                                                  await axios.patch(
                                                    `${COMMENT}/${commentID}`,
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
                                                setComments((prev) => {
                                                  const newarray = prev.filter(
                                                    (com) =>
                                                      com.comment_id !==
                                                      commentID
                                                  );
                                                  newarray.unshift({
                                                    ...response?.data?.data,
                                                    user_name: user.user_name,
                                                    profileimage:
                                                      user.profileimage,
                                                  });
                                                  return newarray;
                                                });
                                                showSnackbar(
                                                  response?.data?.message,
                                                  response?.data?.success
                                                );
                                              } catch (error) {
                                                console.log(error);
                                                showSnackbar(
                                                  error?.response?.data
                                                    ?.message,
                                                  false
                                                );
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
