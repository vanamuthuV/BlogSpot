import React, { useEffect, useRef, useState } from "react";
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
import "../createpost/createpost.css";
import axios from "../../../api/axios";
import "../createpost/createpost.css";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ImageComponent from "../../../utils/ImageComponent";

const modules = {
  // toolbar: [
  //   [{ header: [1, 2, false] }],
  //   ["bold", "italic", "underline", "strike"],
  //   ["blockquote", "code-block"],
  //   [{ list: "ordered" }, { list: "bullet" }],
  //   [{ indent: "-1" }, { indent: "+1" }],
  //   [{ font: ["Fira Code"] }],
  //   [{ align: [] }][("link", "image")],
  //   ["clean"],
  // ],
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

const CREATE_POST = "/post";

// const formats = [
//   "header",
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

export const Edit = ({ post_ids }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");
  const [type, setType] = useState("");
  const [comment, setComments] = useState();
  const [currentImage, setCurrentImage] = useState();
  const contents = useRef();
  const Image = useRef();
  const summarys = useRef("");

  const handleComment = (event) => {
    setComments((prev) => !prev);
  };

  const EDITREQUESTER = "/editresource";
  const EDITUPDATER = "/edit";
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(EDITREQUESTER, {
          data: { post_ids: post_ids },
          headers: {
            "Content-Type": "multipart/form-data", // Adjust the content type as needed
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        });
        console.log(response?.data);
        const {
          post_title,
          post_images,
          post_content,
          post_category,
          post_comment_type,
          post_id,
          post_summary,
          post_tags,
          post_type,
        } = response?.data?.data[0];
        console.log(post_title);
        setTitle(post_title);
        setContent(post_content);
        setCategory(post_category);
        setComments(post_comment_type === "true" ? true : false);
        console.log(post_summary);
        setSummary(post_summary);
        setTags(post_tags);
        setType(post_type);
        setCurrentImage(post_images);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const IMAGEUPDATER = "/imageupdate";

  const ImageHandler = (event) => {
    setMedia(Image.current.files[0]);
  };

  const datas = new FormData();

  useEffect(() => {
    (async () => {
      try {
        datas.set("media", media);
        const response = await axios.post(IMAGEUPDATER, datas, {
          headers: {
            "Content-Type": "multipart/form-data", // Adjust the content type as needed
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        });
        console.log(response?.data?.data);
        setCurrentImage(response?.data?.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [media]);

  /* 
    Hello Developers!!
    * Today I'm Here To Teach How you can handle the useState delay ?
    -> So, in my case i came across one particular situation where if you select a image then it will
    be updated in useState and the useState variable is sent to the server for manipulations.
    But i got stuck in a problem when i  first select of any image the data sent is undefined and if 
    i select the second image then the data sent is the first image, so basically the problem is useState is one step
    behind as we know.

    -> To overcome this just use useEffect with the dependency array as the useState variable when ever the state is
    updated then i automatically fires the useEffect. So, useEffect will be having the communication code to the server.
  */

  const SubmitHandler = async (ev) => {
    ev.preventDefault();
    // const data = new FormData();
    // data.set("title", title);
    // data.set("content", content);
    // data.set("media", currentImage);
    // data.set("category", category);
    // data.set("tags", tags);
    // data.set("summary", summary);
    // data.set("posttype", type), data.set("comments", comment);
    // console.log(data);

    const data = {
      title: title,
      content: content,
      media: currentImage,
      category: category,
      tags: tags,
      summary: summary,
      posttype: type,
      comments: comment,
      post_ids: post_ids,
    };

    try {
      const response = await axios.post(EDITUPDATER, {
        data,
        headers: {
          "Content-Type": "multipart/form-data", // Adjust the content type as needed
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
        },
      });
      console.log(response?.data);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="flex flex-col items-center justify-center">
      <h1 className="m-5 text-3xl font-bold">Editing Blog</h1>
      <div className="w-full">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={SubmitHandler}
          enctype="multipart/form-data"
        >
          <input
            className="w-3/4 border-2 border-#303030-500 border-solid rounded-lg pt-2 pb-2 pl-5 pr-5 m-5"
            type="title"
            value={title}
            onChange={(ev) => {
              setTitle(() => ev.target.value);
            }}
            placeholder="Title"
            required
          ></input>
          <div
            style={{
              width: "350px",
              height: "350px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
            className="flex flex-row items-center justify-center"
          >
            {/* <img
              className="max-w-full min-w-full max-h-96 rounded-xl"
              src={`http://localhost:5000/${currentImage}`}
            /> */}
            <ImageComponent
                features={"max-w-full min-w-full max-h-96 rounded-xl"}
                base64String={currentImage}
            />
          </div>

          <input
            className="pb-5 cursor-pointer border-2-gray"
            ref={Image}
            onChange={ImageHandler}
            type="file"
            id="images"
          />
          <ReactQuill
            className="w-3/4 min-h-5"
            modules={modules}
            value={content}
            ref={contents}
            onChange={(ev) => {
              setContent(() => contents.current.value);
              console.log(content);
            }}
            style={{ fontFamily: "Space Mono" }}
          />
          <input
            className="m-5 w-3/4 border-2 border-#303030-7000 border-solid pt-2 pb-2 pl-5 pr-5 rounded-lg"
            value={category}
            onChange={(ev) => {
              setCategory(() => ev.target.value);
            }}
            type="text"
            placeholder="Category ?"
          ></input>
          <input
            className="m-5 w-3/4 border-2 border-#303030-7000 border-solid pt-2 pb-2 pl-5 pr-5 rounded-lg"
            value={tags}
            onChange={(ev) => {
              setTags(() => ev.target.value);
            }}
            type="text"
            placeholder="Tags"
          ></input>
          {/* <input
            className="m-5 w-3/4 border-2 border-#303030-7000 border-solid pt-2 pb-2 pl-5 pr-5 rounded-lg"
            value={summary}
            onChange={(ev) => {
              setSummary(() => ev.target.value);
            }}
            type="summary"
            placeholder="Summary"
          ></input> */}

          <ReactQuill
            className="w-3/4 min-h-5"
            modules={modulesSummary}
            value={summary}
            ref={summarys}
            onChange={() => {
              setSummary(summarys.current.value);
            }}
            placeholder="Summary"
            style={{ fontFamily: "Space Mono" }}
          />

          <label className="font-semibold text-md" htmlFor="type">
            Select the post visibility
          </label>
          <select
            id="type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5 mb-5"
            value={type}
            onChange={(ev) => {
              setType(() => ev.target.value);
            }}
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
                onChange={handleComment}
                checked={comment}
                type="checkbox"
              />
              <span class="slider round"></span>
            </label>
            <p className="pl-2 pr-2 text-lg">On</p>
          </Stack>

          <button
            className="pt-2 pb-2 pl-5 pr-5 mt-5 mb-10 transition duration-100 delay-100 bg-orange-500 rounded-lg text-gray-50 hover:bg-gray-50 hover:text-orange-500 hover:border-2 hover:border-orange-500"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export const EditCaller = () => {
  const { post_ids } = useParams();
  console.log(post_ids);
  return <Edit post_ids={post_ids} />;
};
