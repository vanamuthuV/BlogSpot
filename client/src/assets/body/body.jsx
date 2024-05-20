import React from "react";
import "./body.css";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { format } from "date-fns";
import ImageComponent from "../../../utils/ImageComponent";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
import GroupIcon from '@mui/icons-material/Group';
import img from "../../../public/Profile.jpeg"
import { Tooltip } from "@mui/material";

export const Post = ({
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
  count,
  type
}) => {
  console.log(post_images);
  return (
    <div className="relative flex flex-col items-center justify-start w-2/4 p-5 mt-10 shadow-lg max-md:mt-5 max-md:flex-wrap max-md:w-11/12 max-md:mb-5 rounded-xl max-md:pt-0">
      {type === "trending" && (
        <Tooltip title="trending" className="cursor-pointer">
          <div className="absolute flex flex-row items-center justify-center animate-blinker -top-5 left-3">
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
            <span className="text-red-500 max-md:text-sm">{count}</span>
          </div>
        </Tooltip>
      )}{" "}
      {type === "new" && (
        <Tooltip title="new" className="cursor-pointer">
          <div className="absolute flex flex-row items-center justify-center font-bold text-green-500 animate-blinker -top-5 left-3 max-md:-top-6 max-md:text-sm">
            New
          </div>
        </Tooltip>
      )}
      {type === "network" && (
        <Tooltip title="friends" className="cursor-pointer">
          <GroupIcon
            className="absolute flex flex-row items-center justify-center font-bold text-orange-500 animate-blinker -top-5 left-3 max-md:-top-6 max-md:text-sm"
            fontSize="sm"
          />
        </Tooltip>
      )}
      <div className="flex flex-row items-center justify-center w-full mt-1 mb-1 h-60 max-md:mt-2 max-md:mb-2 max-md:h-40 max-md:min-w-full max-md:max-w-full">
        {/* <img
          src={`http://localhost:5000/${post_images}`}
          alt={post_title}
          className="max-w-full max-h-full max-md:w-full"
        /> */}
        <ImageComponent
          base64String={post_images}
          features={"w-full max-h-full max-md:w-full m-5 max-md:m-0"}
          altName={post_title}
        />
      </div>
      <div>
        <div className="m-5 max-md:m-0">
          <Link to={`/read/${post_id}`}>
            <h3 className="inline-block pb-1 text-lg font-bold hover:opacity-80 max-md:text-xl">
              {post_title}
            </h3>
          </Link>
          <div className="ql-snow">
            <div
              className="pt-1 text-sm text-justify ql-editor max-md:text-xs"
              dangerouslySetInnerHTML={{
                __html:
                  post_summary.length <= 290
                    ? post_summary
                    : post_summary.substring(0, 290) + "...",
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
            <div className="flex flex-row items-center justify-center">
              <time className="pr-1 text-sm max-md:text-xs text-neutral-600">
                {/* {format(post_upload_time, "MMM dd, yyyy")} */}
                {<ReactTimeAgo date={post_upload_time} locale="en-US" />}
              </time>
              &middot;
              <p className="pl-1 text-sm text-neutral-600 max-md:text-xs">
                {Math.round(post_content.split("").length / 200)} min read
              </p>
            </div>
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
            <p className="flex flex-row items-center justify-center text-sm max-md:text-xs">
              <Link style={{ display: "inline-block" }} to={`/${user_name}`}>
                <div className="flex flex-row items-center justify-center">
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
                </div>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
