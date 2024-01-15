import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AddIcon from "@mui/icons-material/Add";
import "./postdetails.css";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import { formatISO9075, format } from "date-fns";

const POSTDETAIL_URL = "/postdetails";

export const PostDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

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

  return (
    <>
      <div>
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <h1 className="text-3xl">Turning on the lights</h1>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center w-8/12 justify-evenly">
              <h1 className="mt-10 mb-3 text-2xl font-bold text-center font-fira">
                {data.post_title}
              </h1>
              <div className="flex flex-row items-center justify-evenly">
                <p className="m-5 text-xl">
                  By{" "}
                  <Link
                    className="text-blue-400 underline"
                    to={`/${data.user_name}`}
                  >
                    {data.user_name}
                  </Link>
                </p>
                <p>{format(data.post_upload_time, "dd-MMM-yyyy HH:mm")}</p>
              </div>
              <img
                width={"450px"}
                height={"450px"}
                src={`http://localhost:5000/${data.post_images}`}
                className="m-5 mb-10 rounded-xl"
              />
              <div
                dangerouslySetInnerHTML={{ __html: data.post_content }}
                className="text-justify"
              ></div>
              <div className="flex flex-row flex-wrap items-center justify-evenly">
                <div className="flex flex-row items-center">
                  <p>{data.user_name}</p>
                  <Button startIcon={<AddIcon />}> Follow </Button>
                </div>

                <Button startIcon={<ThumbUpIcon />}> Like</Button>
                <Button startIcon={<ThumbDownIcon />}> Dislike</Button>
                {data.post_comment_type === "true" ? (
                  <div className="flex flex-row items-center justify-evenly">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountCircle
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        id="input-with-sx"
                        label="Add a comment..."
                        variant="standard"
                      />
                    </Box>
                    <Button endIcon={<SendIcon />}> Comment</Button>
                  </div>
                ) : (
                  <p>Comments are disabled for this particular post</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
