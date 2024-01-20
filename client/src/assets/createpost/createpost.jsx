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
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
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
  const type = useRef(null);

  const [alignment, setAlignment] = React.useState("public");
  const navigate = useNavigate();

  const handleChange = () => {
    setAlignment(type.current.value);
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
    <div className="flex flex-col items-center justify-center">
      <h1 className="m-5 text-3xl font-bold">Writing on Blogspot</h1>
      <div className="w-full">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={SubmitHandler}
          enctype="multipart/form-data"
        >
          <input
            className="w-3/4 border-2 border-#303030-500 border-solid rounded-lg pt-2 pb-2 pl-5 pr-5 m-5"
            type="title"
            ref={title}
            placeholder="Title"
            required
          ></input>
          <input
            className="pb-5 cursor-pointer border-2-gray"
            ref={media}
            type="file"
            id="images"
          />
          <ReactQuill
            className="w-3/4 min-h-5"
            modules={modules}
            formats={formats}
            ref={content}
          />
          <input
            className="m-5 w-3/4 border-2 border-#303030-7000 border-solid pt-2 pb-2 pl-5 pr-5 rounded-lg"
            ref={category}
            type="text"
            placeholder="Category ?"
          ></input>
          <input
            className="m-5 w-3/4 border-2 border-#303030-7000 border-solid pt-2 pb-2 pl-5 pr-5 rounded-lg"
            ref={tags}
            type="text"
            placeholder="Tags"
          ></input>
          <input
            className="m-5 w-3/4 border-2 border-#303030-7000 border-solid pt-2 pb-2 pl-5 pr-5 rounded-lg"
            ref={summary}
            type="summary"
            placeholder="Summary"
          ></input>

          {/* <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="public">PUBLIC</ToggleButton>
            <ToggleButton value="private">PRIVATE</ToggleButton>
          </ToggleButtonGroup> */}
          <label className="font-semibold text-md" htmlFor="type">
            Select the post visibility
          </label>
          <select
            id="type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5 mb-5"
            ref={type}
            value={alignment}
            onChange={handleChange}
          >
            <option value={"public"}>Public</option>
            <option value={"private"}>Private</option>
          </select>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <p className="pr-5 text-lg font-bold">Comments</p>
            <p className="pl-2 pr-2 text-lg">Off</p>
            <label class="switch">
              <input
                value={comments}
                checked={comments}
                onChange={handleComment}
                type="checkbox"
              />
              <span class="slider round"></span>
            </label>
            <p className="pl-2 pr-2 text-lg">On</p>
          </Stack>

          <button
            className="pt-1 pb-1 pl-2 pr-2 ml-2.5 bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-2 border-gray-800 border-solid rounded-lg"
            type="submit"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};
