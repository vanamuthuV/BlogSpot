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
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { format } from "date-fns";
import ImageComponent from "../../../utils/ImageComponent";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
import GroupIcon from "@mui/icons-material/Group";
import img from "../../../public/Profile.jpeg";
import { Button, Tooltip } from "@mui/material";
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
import { useNavigate } from "react-router-dom";

const READ_URL = "/readblog";
const ADDBOOKMARK = "/addbookmark";
const REMOVEBOOKMARK = "/removebookmark";

export const PostRequester = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ClickAnalyzer, setClickAnalyzser] = useState("trending");
  const { user } = useAuth();
  const navigate = useNavigate();
  // console.log(user);
  useEffect(() => {
    const ReadBlog = async () => {
      try {
        setLoading(true);
        // console.log(user.user_id);
        // console.log(localStorage.getItem("user_id"))
        const response = await axios.post(READ_URL, {
          type: ClickAnalyzer,
          id: localStorage.getItem("user_id")
            ? localStorage.getItem("user_id")
            : "123e4567-e89b-12d3-a456-426614174000",
        });
        // console.log(response?.data);
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

  // const [bookMark, setbookMark] = useState(is_bookmarked);
  const [social, setSocial] = useState(false);

  const AddBookMark = async (post_id) => {
    if (Object.keys(user).length == 0) navigate("/SignUp");
    else {
      try {
        const data = {
          user_id: user.user_id,
          post_id: post_id,
          type: ClickAnalyzer,
        };
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        };
        const response = await axios.post(ADDBOOKMARK, data, { headers });
        // console.log(response);
        // ClickAnalyzer === "trending" && setTrendingData(response?.data?.posts);
        // ClickAnalyzer === "new" && setNewData(response?.data?.posts);
        // ClickAnalyzer === "network" && setNetworkData(response?.data?.posts);
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
      type: ClickAnalyzer,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    try {
      const response = await axios.post(REMOVEBOOKMARK, data, { headers });
      // ClickAnalyzer === "trending" && setTrendingData(response?.data?.posts);
      // ClickAnalyzer === "new" && setNewData(response?.data?.posts);
      // ClickAnalyzer === "network" && setNetworkData(response?.data?.posts);
      setData(response?.data?.posts);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(user);

  return (
    <>
      {loading ? (
        <div className="flex flex-row items-center justify-center h-[calc(100vh-57px)]">
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
          {data.map((post) => {
            const {
              post_title,
              post_images,
              post_id,
              user_name,
              post_upload_time,
              post_category,
              post_tags,
              post_content,
              post_summary,
              user_id,
              profileimage,
              likecount,
              dislikecount,
              type,
              is_bookmarked,
              bookmarkid,
            } = post;
            // return <Post {...post} count={count} type={ClickAnalyzer} />;
            return (
              <div className="relative flex flex-col items-start justify-center w-2/4 p-5 mt-5 border shadow-lg max-md:flex-wrap max-md:w-11/12 max-md:mb-5 rounded-xl ">
                <div className="flex flex-row items-center justify-between w-full pb-5">
                  <p className="flex flex-row items-center justify-start text-sm max-md:text-xs">
                    <Link
                      style={{ display: "inline-block" }}
                      to={`/${user_name}`}
                    >
                      <div className="flex flex-row items-center justify-start ">
                        {profileimage === null ? (
                          <img className="w-5 h-5" src={img} alt={user_name} />
                        ) : (
                          <ImageComponent
                            base64String={profileimage}
                            features={"w-5 h-5"}
                            altName={user_name}
                          />
                        )}
                        <p className="pl-2 pr-2 text-sm font-bold opacity-80 hover:opacity-100">
                          {user_name}
                        </p>
                        &middot;
                        <time className="pl-1 text-sm max-md:text-xs text-neutral-600">
                          {/* {format(post_upload_time, "MMM dd, yyyy")} */}
                          {
                            <ReactTimeAgo
                              date={post_upload_time}
                              locale="en-US"
                            />
                          }
                        </time>
                      </div>
                    </Link>
                  </p>
                  {ClickAnalyzer === "trending" && (
                    <Tooltip title="trending" className="cursor-pointer">
                      <div className="flex flex-row items-center justify-center animate-blinker">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-6 h-6 text-red-500 max-md:w-4 max-md:h-4"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                            clip-rule="evenodd"
                          />
                        </svg>{" "}
                      </div>
                    </Tooltip>
                  )}
                  {ClickAnalyzer === "new" && (
                    <Tooltip title="new" className="cursor-pointer">
                      <div className="flex flex-row items-center justify-center text-sm text-green-500 animate-blinker max-md:text-xs">
                        New
                      </div>
                    </Tooltip>
                  )}
                  {ClickAnalyzer === "network" && (
                    <Tooltip title="friends" className="cursor-pointer">
                      <GroupIcon
                        className="flex flex-row items-center justify-center text-orange-500 animate-blinker"
                        fontSize="sm"
                      />
                    </Tooltip>
                  )}
                  {ClickAnalyzer === "foryou" && (
                    <div className="flex flex-row items-center justify-center h-96">
                      <p className="text-2xl text-orange-500">Coming Soon</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row items-center justify-between w-full max-md:flex-col-reverse">
                  <div className="w-3/4 max-md:w-full">
                    <div className="">
                      <Link to={`/read/${post_id}`}>
                        <h3 className="inline-block pb-1 font-bold text-md hover:opacity-80 max-md:text-xl">
                          {post_title}
                        </h3>
                      </Link>
                      <div className="ql-snow">
                        <div
                          className="pt-1 text-sm text-justify ql-editor max-md:text-xs"
                          dangerouslySetInnerHTML={{
                            __html:
                              post_summary.length <= 150
                                ? post_summary
                                : post_summary.substring(0, 150) + "...",
                          }}
                        ></div>
                      </div>
                      {/* <div
            className="pt-1 text-sm text-justify max-md:text-xs"
            dangerouslySetInnerHTML={{
              __html:
                post_summary.length <= 290
                  ? post_summary
                  : post_summary.substring(0, 290) + "...",
            }}
          ></div> */}
                      <div className="flex flex-row items-center justify-between mt-2">
                        <div className="relative flex flex-row items-center justify-center">
                          <p className="pl-1 text-sm text-neutral-600 max-md:text-xs">
                            {Math.round(post_content.split("").length / 200)}{" "}
                            min read
                          </p>

                          <Tooltip
                            className="flex flex-row items-center justify-center"
                            title="Bookmark"
                          >
                            <div>
                              {is_bookmarked ? (
                                <button
                                  value={bookmarkid}
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
                                <button onClick={() => AddBookMark(post_id)}>
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
                            <div className="absolute flex flex-row items-center justify-center -right-48 max-md:-right-38 ">
                              <Tooltip title="Whatsapp">
                                <a
                                  className="pl-2 pr-2 max-md:pl-1 max-md:pr-1"
                                  onClick={() => setSocial((prev) => !prev)}
                                  href={getWhatsAppUrl({
                                    url: `https://inkwellify.vercel.app/read/${post_id}`,
                                    text: `Hey check this amazing post - `,
                                  })}
                                >
                                  <WhatsAppIcon fontSize="small" />
                                </a>
                              </Tooltip>

                              <Tooltip title="Copy">
                                <div
                                  className="pl-2 pr-2 max-md:pl-1 max-md:pr-1"
                                  onClick={() => {
                                    setSocial((prev) => !prev);
                                    return copyToClipboard(
                                      `https://inkwellify.vercel.app/read/${post_id}`
                                    );
                                  }}
                                >
                                  <ContentCopyIcon fontSize="small" />
                                </div>
                              </Tooltip>

                              <Tooltip title="X">
                                <a
                                  onClick={() => setSocial((prev) => !prev)}
                                  className="pl-2 pr-2 max-md:pl-1 max-md:pr-1"
                                  href={getTwitterUrl({
                                    url: `https://inkwellify.vercel.app/read/${post_id}`,
                                    text: `Hey check this amazing post from ${"https://inkwellify.vercel.app"}`,
                                    hashtags: post_tags,
                                    related: post_category,
                                  })}
                                >
                                  <XIcon fontSize="small" />
                                </a>
                              </Tooltip>

                              <Tooltip title="LinkedIn">
                                <a
                                  onClick={() => setSocial((prev) => !prev)}
                                  className="pl-2 pr-2 max-md:pl-1 max-md:pr-1"
                                  href={getLinkedinUrl({
                                    url: `https://inkwellify.vercel.app/read/${post_id}`,
                                    title: post_title,
                                    source: `${"https://inkwellify.vercel.app"}`,
                                  })}
                                >
                                  <LinkedInIcon fontSize="small" />
                                </a>
                              </Tooltip>

                              <Tooltip title="Facebook">
                                <a
                                  className="pl-2 pr-2 max-md:pl-1 max-md:pr-1"
                                  href={getFacebookUrl({
                                    url: `https://inkwellify.vercel.app/read/${post_id}`,
                                    hashtag: post_tags,
                                  })}
                                >
                                  <FacebookIcon fontSize="small" />
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
                                class="w-5 h-5 cursor-pointer max-md:w-4 max-md:h-4"
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
                        {/* <p className="pt-1 pb-1 pl-1 pr-1 text-sm font-normal rounded-md bg-orange-50 text-neutral-800 ">
                          {post_category}
                        </p> */}
                        <div className="flex flex-row items-center justify-center">
                          <p className="flex flex-row items-center justify-center pr-1 text-sm text-green-500 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="w-5 h-5 pr-1 max-md:w-4 max-md:h-4"
                            >
                              <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
                            </svg>

                            {likecount}
                          </p>
                          <p className="flex flex-row items-center justify-center pl-1 text-sm text-red-500 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-5 h-5 pr-1 max-md:w-4 max-md:h-4"
                            >
                              <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                            </svg>

                            {dislikecount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center ml-5 mr-5 w-28 h-28 max-md:mt-2 max-md:mb-2 max-md:h-full max-md:min-w-full max-md:max-w-full">
                    {/* <img
          src={`http://localhost:5000/${post_images}`}
          alt={post_title}
          className="max-w-full max-h-full max-md:w-full"
        /> */}
                    <ImageComponent
                      base64String={post_images}
                      features={"w-full h-28 max-md:w-full max-md:h-full"}
                      altName={post_title}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
