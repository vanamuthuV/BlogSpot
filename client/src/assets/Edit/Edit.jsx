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
import { CircularProgress } from "@mui/material";
import ImageComponent from "../../../utils/ImageComponent";
import { useSnackbarContext } from "../../context/snackProvider";

const StyledReactQuill = styled(ReactQuill)({
  "& .ql-toolbar": {
    backgroundColor: "rgb(249 115 22)",
    borderColor: "rgb(249 115 22)",
    "& .ql-picker": {
      color: "white",
    },
    "& .ql-stroke": {
      stroke: "white",
    },
    "& .ql-fill": {
      fill: "white",
    },
    "& button:hover .ql-stroke": {
      stroke: "#f1f1f1",
    },
    "& button:hover .ql-fill": {
      fill: "#f1f1f1",
    },
  },
  "& .ql-container": {
    minHeight: "200px",
    fontSize: "16px",
  },
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
    [{ align: [] }],
    ["code-block"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "color",
  "background",
  "link",
  "image",
  "video",
  "align",
  "code-block",
];

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

  const { showSnackbar } = useSnackbarContext();

  const EDIT = "/post/post";
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(`${EDIT}/${post_ids}`, {
          headers: {
            "Content-Type": "application/json", // Adjust the content type as needed
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        });
        // console.log(response?.data);
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
        // console.log(post_title);
        setTitle(post_title);
        setContent(post_content);
        setCategory(post_category);
        setComments(post_comment_type === "true" ? true : false);
        // console.log(post_summary);
        setSummary(post_summary);
        setTags(post_tags);
        setType(post_type);
        setCurrentImage(post_images);
        setLoading(false);
      } catch (error) {
        console.error(error);
        showSnackbar(error?.response?.data?.message, false);
      }
    })();
  }, []);

  const ImageHandler = (event) => {
    setMedia(Image.current.files[0]);
  };

  useEffect(() => {
    (async () => {
      if (media || currentImage) {
        const base64String = await readFileAsDataURL(media);
        setCurrentImage(base64String);
      } else {
        console.error("No file selected");
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

  const SubmitHandler = async (ev) => {
    setLoading(true);
    ev.preventDefault();
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

    console.log(data);

    try {
      const response = await axios.put(`${EDIT}/${post_ids}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data);
      setLoading(false);
      if (response?.data?.success) {
        showSnackbar(response?.data?.message, response?.data?.success);
        navigate(`/read/${post_ids}`);
      }
    } catch (error) {
      console.error(error.message);
      showSnackbar(error?.response?.data?.message, false);
    }
  };

  return loading ? (
    <div className="flex flex-row items-center justify-center w-full h-[calc(100vh-57px)]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle
          fill="#F97316"
          stroke="#F97316"
          stroke-width="28"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="1.5"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
        <circle
          fill="#F97316"
          stroke="#F97316"
          stroke-width="28"
          opacity=".8"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="1.5"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin="0.05"
          ></animate>
        </circle>
        <circle
          fill="#F97316"
          stroke="#F97316"
          stroke-width="28"
          opacity=".6"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="1.5"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".1"
          ></animate>
        </circle>
        <circle
          fill="#F97316"
          stroke="#F97316"
          stroke-width="28"
          opacity=".4"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="1.5"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".15"
          ></animate>
        </circle>
        <circle
          fill="#F97316"
          stroke="#F97316"
          stroke-width="28"
          opacity=".2"
          r="15"
          cx="35"
          cy="100"
        >
          <animate
            attributeName="cx"
            calcMode="spline"
            dur="1.5"
            values="35;165;165;35;35"
            keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
            repeatCount="indefinite"
            begin=".2"
          ></animate>
        </circle>
      </svg>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-3/4">
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
          <StyledReactQuill
            ref={contents}
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Write your post content here..."
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
          <label className="mt-4 font-semibold text-md" htmlFor="type">
            Summary
          </label>
          <textarea
            name=""
            id=""
            value={summary}
            ref={summarys}
            onChange={() => {
              setSummary(summarys.current.value);
            }}
            className="w-full mb-5 min-h-10"
          ></textarea>

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
  // console.log(post_ids);
  return <Edit post_ids={post_ids} />;
};
