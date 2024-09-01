import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import "./createpost.css";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageComponent from "../../../utils/ImageComponent";

const CREATE_POST = "/post";

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

  const [alignment, setAlignment] = React.useState("public");
  const navigate = useNavigate();

  const [currentMedia, setCurrentMedia] = useState(null);
  const [isListening, setIsListening] = useState(false); // To track last transcript
  const [mycontent, setMyContent] = useState("");
  const recognitionRef = useRef(null); // Ref to hold SpeechRecognition instance
  const handleChange = () => {
    setAlignment(type.current.value);
    // console.log(alignment);
  };

  // Log mycontent changes for debugging
  const shouldRestartRecognition = useRef(true);

  const handleStart = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      console.error("Speech Recognition API is not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set language
    recognition.interimResults = true; // Enable interim results
    recognition.continuous = true; // Continuous recognition
    recognitionRef.current = recognition;

    let finalTranscriptBuffer = mycontent; // Preserve the existing content

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      // Append interim and final transcripts to the buffer
      finalTranscriptBuffer += finalTranscript;

      // Update state with the buffer plus the interim transcript
      setMyContent(`${finalTranscriptBuffer} ${interimTranscript}`);
    };

    recognition.onstart = () => {
      setIsListening(true);
      shouldRestartRecognition.current = true; // Allow restart by default
    };

    recognition.onend = () => {
      setIsListening(false);
      if (shouldRestartRecognition.current && recognitionRef.current) {
        recognitionRef.current.start(); // Restart recognition only if allowed
      }
    };

    // Add event listeners for keyboard interruptions
    window.addEventListener("keydown", handleKeyboardInterrupt);
    window.addEventListener("keyup", handleKeyboardInterrupt);

    recognition.start();
  };

  let isTyping = false; // Track typing state

  const handleKeyboardInterrupt = () => {
    // If the user is typing, stop speech recognition
    if (isTyping) {
      recognitionRef.current.stop();
      shouldRestartRecognition.current = false;
    }
  };

  // Track typing state using keydown and keyup events
  window.addEventListener("keydown", () => {
    isTyping = true;
  });

  window.addEventListener("keyup", () => {
    isTyping = false;
  });

  const handleStop = () => {
    if (recognitionRef.current) {
      shouldRestartRecognition.current = false; // Prevent automatic restart
      recognitionRef.current.stop(); // Stop recognition
      setIsListening(false);
    }
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

  const [loader, setLoader] = useState(false);

  const UpdateThumbnail = async () => {
    const file = media.current.files[0];
    if (file) {
      const base64String = await readFileAsDataURL(file);
      setCurrentMedia(base64String);
    }
  };

  const UpdationContent = () => {
    console.log("Hello Mama");
    setMyContent(content.current.value);
  };

  const SubmitHandler = async (ev) => {
    ev.preventDefault();
    setLoader(true);
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
      setLoader(false);
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
            <div className="flex flex-col items-center justify-center w-3/4">
              {currentMedia && (
                <ImageComponent
                  features={"min-h-52 min-w-52 max-h-52 max-w-52"}
                  base64String={currentMedia}
                />
              )}
              <label
                htmlFor="images"
                className="flex items-center justify-center px-2 py-2 mt-2 text-xs text-white transition-colors bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
              >
                {currentMedia ? "Change Image" : "Upload Image"}
                <input
                  ref={media}
                  onChange={UpdateThumbnail}
                  type="file"
                  name="images"
                  id="images"
                  required
                  className="hidden"
                />
              </label>
            </div>
            <div className="relative w-3/4 max-md:w-11/12">
              <div className="absolute right-5 top-7 max-md:top-20 max-md:right-2">
                {isListening ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="w-5 h-5"
                    onClick={handleStop}
                  >
                    <path d="M280-240v-480h80v480h-80ZM440-80v-800h80v800h-80ZM120-400v-160h80v160h-80Zm480 160v-480h80v480h-80Zm160-160v-160h80v160h-80Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="w-5 h-5"
                    onClick={handleStart}
                  >
                    <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                  </svg>
                )}
              </div>

              <ReactQuill
                className="w-full"
                modules={modules}
                theme="snow"
                value={mycontent}
                ref={content}
                onChange={UpdationContent}
                placeholder="Unleash your creativity and share your story with the world. Write something amazing here!"
              />
            </div>

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
            <p className="flex flex-row items-center justify-start w-3/4 mt-5 mb-2 text-lg text-gray-500 max-md:w-11/12">
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
