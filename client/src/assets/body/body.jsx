import React from "react";
import "./body.css";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

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
    <div className="flex flex-row items-center justify-center w-5/6 border-t-2 max-md:flex-wrap max-md:w-11/12">
      <div className="flex flex-row items-center justify-center h-40 mt-1 mb-1 max-md:mt-2 max-md:mb-2 min-w-60 max-w-60 max-md:h-40 max-md:min-w-48 max-md:max-w-48">
        <img
          src={`http://localhost:5000/${post_images}`}
          alt={post_title}
          className="max-w-full max-h-full rounded-xl max-md:w-full"
        />
      </div>
      <div>
        <div className="m-5 max-md:m-0">
          <Link to={`/Read Blog/${post_id}`}>
            <h3 className="inline-block p-2 text-lg font-bold text-justify hover:underline max-md:text-sm">
              {post_title}
            </h3>
          </Link>
          <div
            className="p-2 text-sm text-justify max-md:text-xs"
            dangerouslySetInnerHTML={{
              __html:
                post_summary.length <= 290
                  ? post_summary
                  : post_summary.substring(0, 290) + "...",
            }}
          ></div>
          <div className="flex flex-row items-center justify-between m-2 max-md:m-2">
            <p className="text-sm max-md:text-xs">
              By
              <Link
                style={{ display: "inline-block" }}
                to={`/${user_name}`}
                className=""
              >
                <p className="inline-block pl-3 pr-3 text-sm font-bold text-gray-900 hover:underline">
                  {user_name}
                </p>
              </Link>
              At
            </p>
            <time className="text-sm max-md:text-xs">
              {<ReactTimeAgo date={post_upload_time} locale="en-IN" />}
            </time>
            <p className="text-sm max-md:hidden">Country : Unkown</p>
          </div>
        </div>
      </div>
    </div>
  );
};
