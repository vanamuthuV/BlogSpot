import React, { useRef, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "./createpost.css";
import axios from "../../../api/axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike"],
//     ["blockquote", "code-block"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ font: ["Fira Code"] }],
//     [{ align: [] }][("link", "image")],
//     ["clean"],
//   ],
// };

const CREATE_POST = "/post";

// const formats = [
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "code-block",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
// ];

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const modulesSummary = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

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

  const handleEditorChange = (contents, editor) => {
    console.log("Content Value:", contents);
    // You can also access the editor instance for more operations
  };

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
      <h1 className="m-5 text-4xl max-md:text-2xl ">Writing on Blogspot</h1>
      <div className="flex flex-col items-center justify-center w-full mb-10">
        <form
          className="flex flex-col items-center justify-center w-full"
          onSubmit={SubmitHandler}
          enctype="multipart/form-data"
        >
          <input
            className="w-3/4 pt-2.5 pb-2.5 pl-5 pr-5 m-5 text-lg border-2 border-gray-500 border-solid rounded-xl max-md:w-5/6"
            type="title"
            ref={title}
            placeholder="Title"
            required
          ></input>
          {/* <input
            className="pb-5 cursor-pointer border-2-gray max-md:w-5/6"
            type="file"
            id="images"
          /> */}
          <div className="w-3/4 form-group file-area">
            <label for="images">
              Images <span>Try To Upload A Image With Resolution.</span>
            </label>
            <input
              ref={media}
              type="file"
              name="images"
              id="images"
              required="required"
            />
            <div class="file-dummy">
              <div class="success">
                Great, your files are selected. Keep on.
              </div>
              <div class="default">Please select a files</div>
            </div>
          </div>
          {/* <ReactQuill
            className=""
            modules={modules}
            formats={formats}
            ref={content}
          /> */}
          <ReactQuill
            className="w-3/4"
            modules={modules}
            theme="snow"
            ref={content}
            placeholder="Unleash your creativity and share your story with the world. Write something amazing here!"
          />

          <input
            className="w-3/4 pt-2.5 pb-2.5 pl-5 pr-5 m-5 text-lg border-2 border-gray-500 border-solid rounded-xl max-md:w-5/6"
            ref={category}
            type="text"
            placeholder="Category ?"
          ></input>
          <input
            className="w-3/4 pt-2.5 pb-2.5 pl-5 pr-5 m-5 text-lg border-2 border-gray-500 border-solid rounded-xl max-md:w-5/6"
            ref={tags}
            type="text"
            placeholder="Tags"
          ></input>
          <ReactQuill
            className="w-3/4"
            modules={modulesSummary}
            theme="snow"
            ref={summary}
            placeholder="Briefly summarize your blog post..."
          />
          <label className="text-lg font-semibold" htmlFor="type">
            Select Your Post Visibility
          </label>
          <select
            id="type"
            className="bg-gray-50 text-gray-50 text-sm rounded-lg focus:outline-none block w-2/4 p-2.5 dark:bg-orange-500 dark:border-orange-600 dark:placeholder-orange-500 dark:text-gray-50 mt-5 mb-5"
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
            className="pt-2 pb-2 pl-5 pr-5 transition duration-100 delay-100 ml-2.5 mt-5 bg-orange-500 text-gray-50 hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 rounded-lg"
            type="submit"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};
