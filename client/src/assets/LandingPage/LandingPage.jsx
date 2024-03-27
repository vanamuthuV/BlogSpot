import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./LandingPage.css";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import CardMedia from "@mui/material/CardMedia";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LANDINGDATA = "/landingdata";

import img1 from "../../../public/svgs/No caash.svg";
import img2 from "../../../public/svgs/No Login.svg";
import img3 from "../../../public/svgs/Unlimited Writing.svg";

const Cards = [
  {
    src: img1,
    title: "No Premium Required",
    pt1: "Enjoy all the features of our blog platform without any premium charges.",
    pt2: "No hidden fees or subscription requirements. Your blog, your way, for free!",
  },
  {
    src: img2,
    title: "Unlimited Words",
    pt1: "Express yourself freely with no restrictions on the length of your blog posts.",
    pt2: "Write as much or as little as you want, without worrying about word limits.",
  },
  {
    src: img3,
    title: "Access Blogs Without Login",
    pt1: "Instantly read blogs from our diverse community without the need to log in.",
    pt2: "Explore a variety of topics and perspectives hassle-free.",
  },
];

// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&::before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255, .05)"
//       : "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(90deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

const AccordionDetail = [
  {
    Question: " How do I upload a blog post?",
    Answers:
      "To upload a blog post, simply log in to your account and navigate to the 'Create Blog' section. Fill in th required details such as the title, content, and any relevant tags, then click 'Create' to upload your post.",
  },
  {
    Question: "Can I edit my blog posts after uploading?",
    Answers:
      "Yes, you can edit your blog posts after uploading them. Simply go to the 'Profile' section in your account, find the blog post you want to edit, make your changes, and click 'Update' to update the post.",
  },
  {
    Question: "Is there a limit to the number of words in a blog post?",
    Answers:
      " No, there is no limit to the number of words in a blog post. You can write as much as you want to fully express your ideas and thoughts.",
  },
  {
    Question: " How do I delete my account?",
    Answers:
      "To delete your account, go to the 'Account Settings' section of your account and select the option to delete your account. Please note that this action is irreversible and will permanently delete all your data.",
  },
];

export const LandingPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState("panel1");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const value = {
    user_id: Object.keys(user).length !== 0 ? user.user_id : null,
  };

  useEffect(() => {
    console.log(user);
    (async () => {
      try {
        const response = await axios.post(LANDINGDATA, value);
        console.log(response?.data?.data);
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  return (
    <div>
      <div
        style={{ height: "500px" }}
        className="flex flex-col items-start justify-end w-full pl-10 mb-16 max-md:h-64 bg-[url('../../../public/BackgroundImage.png')] bg-no-repeat bg-cover pb-10 max-md:pb-5 max-md:mb-8"
      >
        <div className="w-4/6 mb-8">
          <h1 className="text-4xl max-md:text-xl">
            "Welcome to a world where words dance off the page and ideas ignite
            your imagination."
          </h1>
        </div>
        <div>
          <Link to={Object.keys(user).length === 0 ? "/SignUp" : "createpost"}>
            <button className="pt-2 pb-2 max-md:pl-3 max-md:pr-3 pl-8 pr-8 font-bold bg-orange-500 rounded-lg text-gray-50 mr-2.5 max-md:text-sm">
              Create Post
            </button>
          </Link>
          <Link to={"/Read Blog"}>
            <button className="pt-2  max-md:pl-3 max-md:pr-3 pb-2 pl-8 pr-8 ml-2.5 font-bold text-orange-500 border border-orange-500 rounded-lg bg-gray-50  max-md:text-sm">
              Start Reading
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full pb-5">
        <h1 className="pt-10 pb-10 text-3xl font-bold text-center text-orange-500 max-md:pt-5 max-md:pb-5">
          Trending Blogs
        </h1>
        {loading ? (
          <div className="flex flex-row items-center justify-center w-full h-40">
            <CircularProgress disableShrink />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap items-center justify-around w-full gap-5 p-5">
            {data.map((post) => {
              return (
                <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-xl hover:shadow-xl w-96">
                  <div className="flex flex-row flex-wrap items-center justify-between w-full mt-2 mb-2">
                    <div className="flex flex-row items-center justify-center w-full mr-2">
                      <img
                        className="rounded-full min-w-6 max-w-6 min-h-6 max-h-6"
                        src={
                          post.profileimage
                            ? `http://localhost:5000/${post.profileimage}`
                            : "../../../public/Profile.jpeg"
                        }
                      />
                      <div className="flex flex-row items-center justify-between w-full pl-2">
                        <p className="font-normal">
                          <Link to={`/${post.user_name}`}>
                            <span className="pr-2 text-sm hover:underline">
                              {post.userfullname
                                ? post.userfullname.length > 26
                                  ? post.userfullname.substring(0, 26) + "..."
                                  : post.userfullname
                                : post.user_name.length > 26
                                ? post.user_name.substring(0, 26) + "..."
                                : post.user_name}
                            </span>
                          </Link>
                          &middot;
                          <button className="pl-2 text-orange-500">
                            follow
                          </button>
                          {/* <button className="pl-2 text-green-500">
                            following
                          </button> */}
                        </p>
                        <p className="text-sm text-neutral-500 ">
                          {/* Uploaded on{" "} */}
                          {format(post.post_upload_time, "MMM dd,yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center mt-2 mb-2 max-md:mt-1 max-md:mb-1">
                    <Link
                      className="flex flex-row items-center justify-center mt-2 mb-2"
                      to={`/Read Blog/${post.post_id}`}
                    >
                      <p className="pr-2 mt-3 mb-2 text-base font-bold max-md:text-sm">
                        {post.post_title.length > 40
                          ? post.post_title.substring(0, 60) + "..."
                          : post.post_title}
                      </p>
                      <img
                        className=" min-h-14 min-w-20 max-h-14 max-w-20"
                        src={`http://localhost:5000/${post.post_images}`}
                      />
                    </Link>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full pl-3 pr-3 ">
                    <p className="pt-1 pb-1 pl-1 pr-1 text-sm font-normal rounded-md bg-orange-50 text-neutral-800 ">
                      {post.post_category}
                    </p>
                    <p className="flex flex-row items-center justify-center ml-2 mr-2 text-sm text-neutral-500">
                      {Math.round(post.post_content.split("").length / 200)}
                      <span className="pl-1">min read</span>
                    </p>
                    <div className="flex flex-row items-center justify-center ">
                      <p className="flex flex-row items-center justify-center pr-1 text-sm text-green-500 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="w-5 h-5 pr-1 max-md:w-4 max-md:h-4"
                        >
                          <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
                        </svg>

                        {post.likes_count}
                      </p>
                      <p className="flex flex-row items-center justify-center pl-1 text-sm text-red-500 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-5 h-5 pr-1 max-md:w-4 max-md:h-4"
                        >
                          <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                        </svg>

                        {post.dislikes_count}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center w-full">
        <div className="flex flex-row items-center justify-between w-11/12 mt-10 mb-20">
          <div className="w-2/4 pr-10 max-md:pr-2">
            <h1 className="text-6xl leading-snug max-md:text-2xl">
              Create and share your blog effortlessly.
            </h1>
          </div>
          <div className="w-2/4 pl-10 max-md:pl-2">
            <p className="leading-relaxed max-md:text-xs">
              "Empower your voice with our blog platform, where you can
              effortlessly create and share your stories, building a community
              around your ideas that grows with you."
            </p>
            <Link to={"/SignUp"}>
              <button className="flex flex-row items-center mt-5 text-black transition duration-150 delay-150 hover:text-orange-500 max-md:text-sm">
                <p className="underline underline-offset-4">Get Started </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-7 pl-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-10 mb-10">
        <h1 className="mb-10 text-3xl font-bold text-orange-500">
          What We Have ?{" "}
        </h1>
        <div className="flex flex-row flex-wrap items-center justify-around w-11/12 gap-10 mt-10 mb-10">
          {Cards.map((card) => {
            return (
              <div className="flex flex-col items-center justify-center bg-gray-50 hover:drop-shadow-[0_0px_3px_rgba(249,115,22,1.000)] rounded-lg p-5 max-md:drop-shadow-[0_0px_3px_rgba(249,115,22,1.000)] max-md:m-5">
                <div className="">
                  <img className="w-20 h-20" src={card.src} />
                </div>
                <div>
                  <p className="mt-5 mb-5 text-lg font-bold text-center text-orange-500">
                    {card.title}
                  </p>
                  <div>
                    <p className="flex flex-row text-sm text-justify">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                        stroke="rgb(249, 115, 22)"
                        class="w-5 h-5 mr-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      {card.pt1}
                    </p>
                    <p className="flex flex-row text-sm text-justify">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                        stroke="rgb(249, 115, 22)"
                        class="w-5 h-5 mr-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      {card.pt2}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-start justify-start w-10/12">
          <h1 className="text-2xl font-bold text-orange-500">FAQS</h1>
          <div className="mt-5 mb-10">
            {/* <Container sx={{ marginTop: "10px", marginBottom: "30px" }}> */}
            {AccordionDetail.map((info) => {
              return (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      sx={{ fontWeight: 500, fontFamily: '"Wix Madefor Text"' }}
                    >
                      {info.Question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{ fontFamily: "Wix Madefor Text" }}
                      className="italic"
                    >
                      {info.Answers}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
            {/* </Container> */}

            {/* <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                sx={{}}
              >
                <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
                  How do I upload a blog post?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  {" "}
                  To upload a blog post, simply log in to your account and
                  navigate to the "Create Blog" section. Fill in the required
                  details such as the title, content, and any relevant tags,
                  then click "Create" to upload your post.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                sx={{}}
              >
                <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
                  Can I edit my blog posts after uploading?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  Yes, you can edit your blog posts after uploading them. Simply
                  go to the "Profile" section in your account, find the blog
                  post you want to edit, make your changes, and click "Update"
                  to update the post.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={{
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                sx={{}}
              >
                <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
                  Is there a limit to the number of words in a blog post?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  No, there is no limit to the number of words in a blog post.
                  You can write as much as you want to fully express your ideas
                  and thoughts.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              sx={{
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                sx={{}}
              >
                <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
                  How do I delete my account?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "16px" }}>
                  To delete your account, go to the "Account Settings" section
                  of your account and select the option to delete your account.
                  Please note that this action is irreversible and will
                  permanently delete all your data.
                </Typography>
              </AccordionDetails>
            </Accordion> */}
          </div>
        </div>
      </div>
    </div>
  );
};
