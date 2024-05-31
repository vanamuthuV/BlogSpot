import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import "./createpost.css";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgress } from "@mui/material";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import LinkTool from "@editorjs/link";
// import RawTool from "@editorjs/raw";
// import SimpleImage from "@editorjs/simple-image";
// import Checklist from "@editorjs/checklist";
// import List from "@editorjs/list";
// import Embed from "@editorjs/embed";
// import Quote from "@editorjs/quote";
// import CodeTool from "@editorjs/code"
// import Warning from "@editorjs/warning"
// import Marker from "@editorjs/marker"
// import Delimiter from "@editorjs/delimiter"
// import Table from "@editorjs/table"

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

// const editor = new EditorJS({
//   tools: {
//     header: {
//       class: Header,
//       config: {
//         placeholder: "Enter a header",
//         levels: [2, 3, 4],
//         defaultLevel: 3,
//       },
//     },
//     linkTool: {
//       class: LinkTool,
//       config: {
//         endpoint: "http://localhost:8008/fetchUrl", // Your backend endpoint for url data fetching,
//       },
//     },
//   },
// });

// const editor = new EditorJS('editorjs')

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
    // console.log(alignment);
  };

  const [comments, setComments] = useState(true);

  const handleComment = (event) => {
    setComments((prev) => !prev);
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target.result.split(",")[1]); // Resolve with base64 string
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const [loader, setLoader] = useState(false)

  const SubmitHandler = async (ev) => {
    ev.preventDefault();
    setLoader(true)
    const data = new FormData();
    data.set("title", title.current.value);
    data.set("content", content.current.value);
    data.set("category", category.current.value);
    data.set("tags", tags.current.value);
    data.set("summary", summary.current.value);
    data.set("posttype", alignment), data.set("comments", comments);
    const file = media.current.files[0];
    if (file) {
      const base64String = await readFileAsDataURL(file);
      data.set("media", base64String);
    } else {
      console.error("No file selected");
    }

    try {
      const response = await axios.post(CREATE_POST, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Adjust the content type as needed
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
        },
      });
      // console.log(response?.data?.success);
      // console.log(response?.data?.base);
      // console.log(response?.data?.Base);
      setLoader(false)
      navigate("/");
    } catch (error) {
      console.error(error.message);
      navigate("/createpost");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="m-5 text-4xl font-bold max-md:text-2xl ">
        Writting on Inkwellify
      </h1>
      {loader ? (
        <div className="w-full h-[calc(100vh-96px)] flex flex-row items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full mb-10">
          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={SubmitHandler}
            enctype="multipart/form-data"
          >
            {/* border-2 border-gray-500 border-solid */}
            <input
              className="w-3/4 pt-3 pb-3 pl-5 pr-5 m-5 text-4xl border-l-4 border-gray-300 max-md:w-11/12"
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
              {/* <div> */}
              <p className="pt-1 text-sm italic text-center text-red-400">
                <span className="text-red-500">*</span>This image is shown in
                your post thumbnail as well.
                <span className="text-red-500">*</span>
              </p>
              {/* </div> */}
            </div>
            {/* <ReactQuill
            className=""
            modules={modules}
            formats={formats}
            ref={content}
          /> */}
            <ReactQuill
              className="w-3/4 max-md:w-11/12"
              modules={modules}
              theme="snow"
              ref={content}
              placeholder="Unleash your creativity and share your story with the world. Write something amazing here!"
            />
            <input
              className="w-3/4 pt-3 pb-3 pl-5 pr-5 m-5 text-xl border-l-4 border-gray-300 max-md:w-11/12"
              ref={category}
              type="text"
              placeholder="Category ?"
            ></input>
            <input
              className="w-3/4 pt-3 pb-3 pl-5 pr-5 m-5 text-xl border-l-4 border-gray-300 max-md:w-11/12"
              ref={tags}
              type="text"
              placeholder="Tags"
            ></input>
            <p className="flex flex-row items-center justify-start w-3/4 mt-5 mb-2 text-lg text-gray-500 max-md:w-11/12 animate-blinker">
              Summarize Here{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </p>
            <ReactQuill
              className="w-3/4 max-md:w-11/12"
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
      )}
    </div>
  );
};
