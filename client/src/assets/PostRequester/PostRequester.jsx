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
        <div className="flex flex-col items-center justify-center">
          <h1
            className="w-9/12 pt-5 pb-5 mt-10 mb-10 text-6xl text-center border-t-2 border-b-2 border-gray-900 border-solid max-md:text-4xl max-md:pt-2 max-md:pb-2"
          >
            Blogs
          </h1>
          {data.map((post) => (
            <Post {...post} />
          ))}
        </div>
      )}
    </>
  );
};