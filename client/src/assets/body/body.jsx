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
}) => {
  console.log(post_images);
  return (
    <div className="flex flex-row items-center justify-start w-5/6 max-md:flex-wrap max-md:w-11/12 max-md:mt-5 max-md:mb-5">
      <div className="flex flex-row items-center justify-center h-40 mt-1 mb-1 max-md:mt-2 max-md:mb-2 min-w-60 max-w-60 max-md:h-40 max-md:min-w-full max-md:max-w-full">
        {/* <img
          src={`http://localhost:5000/${post_images}`}
          alt={post_title}
          className="max-w-full max-h-full max-md:w-full"
        /> */}
        <ImageComponent base64String={post_images} features={"max-w-full max-h-full max-md:w-full"} altName={post_title} /> 
      </div>
      <div>
        <div className="m-5 max-md:m-0">
          <Link to={`/read/${post_id}`}>
            <h3 className="inline-block pb-1 text-lg font-bold hover:opacity-80 max-md:text-xl">
              {post_title}
            </h3>
          </Link>
          <div
            className="pt-1 text-sm text-justify max-md:text-xs"
            dangerouslySetInnerHTML={{
              __html:
                post_summary.length <= 290
                  ? post_summary
                  : post_summary.substring(0, 290) + "...",
            }}
          ></div>
          <div className="flex flex-row items-center justify-between mt-2">
            <div className="flex flex-row items-center justify-center">
              <time className="pr-1 text-sm max-md:text-xs text-neutral-600">
                {format(post_upload_time, "MMM dd, yyyy")}
              </time>
              &middot;
              <p className="pl-1 text-sm text-neutral-600 max-md:text-xs">
                {Math.round(post_content.split("").length / 200)} min read
              </p>
            </div>

            <p className="text-sm max-md:text-xs">
              <Link
                style={{ display: "inline-block" }}
                to={`/${user_name}`}
                className=""
              >
                <p className="inline-block pl-3 pr-3 text-sm font-bold text-gray-900 opacity-80 hover:opacity-100">
                  {user_name}
                </p>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
