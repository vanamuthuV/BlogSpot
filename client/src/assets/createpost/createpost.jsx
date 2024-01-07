import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "react-quill/dist/quill.snow.css";
import "./createpost.css";
import axios from "../../../api/axios";
import "./createpost.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: ["Fira Code"] }],
    [{ align: [] }][("link", "image")],
    ["clean"],
  ],
};

const CREATE_POST = "/post";

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

/*
Tool For Formating And Modules For React Quill

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];
*/

export const CreatePost = () => {
  const title = useRef(null);
  const content = useRef(null);
  const media = useRef(null);
  const category = useRef(null);
  const tags = useRef(null);
  const summary = useRef(null);

  const [alignment, setAlignment] = React.useState("public");
  const navigate = useNavigate();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(alignment);
  };

  const [comments, setComments] = useState(true);

  const handleComment = (event) => {
    setComments((prev) => !prev);
  };

  const SubmitHandler = async (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title.current.value);
    data.set("content", content.current.value);
    data.set("media", media.current.files[0]);
    data.set("category", category.current.value);
    data.set("tags", tags.current.value);
    data.set("summary", summary.current.value);
    data.set("posttype", alignment), data.set("comments", comments);
    console.log(data);
    try {
      const response = await axios.post(CREATE_POST, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Adjust the content type as needed
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
        },
      });
      console.log(response?.data?.success);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      navigate("/SignUp");
    }
  };

  return (
    <>
      <form
        className="flex-col"
        onSubmit={SubmitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        enctype="multipart/form-data"
      >
        <input type="title" ref={title} placeholder="Title" required></input>
        <input ref={media} type="file" id="images" />
        <ReactQuill modules={modules} formats={formats} ref={content} />
        <input ref={category} type="text" placeholder="Category ?"></input>
        <input ref={tags} type="text" placeholder="Tags"></input>
        <input ref={summary} type="summary" placeholder="Summary"></input>

        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="public">PUBLIC</ToggleButton>
          <ToggleButton value="private">PRIVATE</ToggleButton>
        </ToggleButtonGroup>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            fontFamily={"Fira Code"}
            fontSize={"20px"}
            sx={{ marginRight: "20px" }}
          >
            Comments
          </Typography>
          <Typography fontFamily={"Fira Code"} fontSize={"18px"}>
            Off
          </Typography>
          <label class="switch">
            <input
              value={comments}
              checked={comments}
              onChange={handleComment}
              type="checkbox"
            />
            <span class="slider round"></span>
          </label>
          <Typography fontFamily={"Fira Code"} fontSize={"18px"}>
            On
          </Typography>
        </Stack>

        <button type="submit">Create Post</button>
      </form>
    </>
  );
};
