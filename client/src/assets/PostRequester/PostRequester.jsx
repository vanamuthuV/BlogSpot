import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import "../body/body.css"
import { Post } from "../body/body";

const READ_URL = "/readblog";

export const PostRequester = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ReadBlog = async () => {
      try {
        const response = await axios.post(READ_URL);
        setData(response?.data?.posts);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    ReadBlog();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div id="Post_Frame">
          {data.map((post) => (
            <Post {...post} />
          ))}
        </div>
      )}
    </>
  );
};