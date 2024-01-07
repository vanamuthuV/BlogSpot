import React from "react";
import "./body.css";
import { CoverPage } from "../LandingPage/LandingPage";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export const Post = ({
  post_title,
  post_images,
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
    <div id="Post">
      <div id="Post_Iamge">
        <img
          className="Post_img"
          src={`http://localhost:5000/${post_images}`}
          alt={post_title}
        />
      </div>
      <Link to={`/${user_id}`}>
        <div id="Post_Text">
          <h3>{post_title}</h3>
          <p>{post_summary}</p>
          <div id="Post_Author">
            <p>
              By
              <a className="Author" href="">
                {user_name}
              </a>
              At
            </p>
            <time>{formatISO9075(post_upload_time)}</time>
            <p>Country : Unkown</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
