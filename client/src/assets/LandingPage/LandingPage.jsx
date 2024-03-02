import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import CircularProgress from "@mui/material/CircularProgress";
import { format } from "date-fns";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./LandingPage.css";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export const LandingPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState("panel1");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(LANDINGDATA);
        console.log(response?.data?.data);
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-start justify-end w-full pl-10 mb-16 mt-28 h-96 bg-inherit">
        <div className="w-4/6 mb-8">
          <h1 className="text-4xl">
            "Welcome to a world where words dance off the page and ideas ignite
            your imagination."
          </h1>
        </div>
        <div>
          <Link to={Object.keys(user).length === 0 ? "/SignUp" : "createpost"}>
            <button className="pt-2 pb-2 pl-8 pr-8 font-bold bg-orange-500 rounded-lg text-gray-50 mr-2.5">
              Create Post
            </button>
          </Link>
          <Link to={"/Read Blog"}>
            <button className="pt-2 pb-2 pl-8 pr-8 ml-2.5 font-bold text-orange-500 border border-orange-500 rounded-lg bg-gray-50">
              Start Reading
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full pb-5">
        <h1 className="pt-10 pb-10 text-3xl font-bold text-center text-orange-500">
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
                <div className="flex flex-row items-center justify-center h-auto pl-5 m-5 shadow-md max-md:flex-col hover:shadow-xl max-md:w-11/12">
                  <div className="flex flex-row items-center justify-center w-36 h-36">
                    <img
                      className="max-h-36 max-w-36"
                      src={`http://localhost:5000/${post.post_images}`}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center h-full pl-5 w-60 max-md:w-full max-md:pl-1">
                    <Link to={`/Read Blog/${post.post_id}`}>
                      <p className="mt-2 mb-2 hover:underline">
                        {post.post_title.length > 60
                          ? post.post_title.substring(0, 60) + "..."
                          : post.post_title}
                      </p>
                    </Link>

                    <div className="flex flex-row flex-wrap items-center justify-between mt-2 mb-2">
                      <div className="flex flex-row items-center justify-center mr-2">
                        <img
                          className="min-w-5 max-w-5 min-h-5 max-h-5"
                          src={
                            post.profileimage
                              ? `http://localhost:5000/${post.profileimage}`
                              : "../../../public/Profile.jpeg"
                          }
                        />
                        <Link to={`/${post.user_name}`}>
                          <p className="pl-1 text-xs hover:underline">
                            {post.user_name}
                          </p>
                        </Link>
                      </div>
                      <p className="flex flex-row items-center justify-center ml-2 mr-2 text-xs text-neutral-500">
                        {Math.round(post.post_content.split("").length / 200)}
                        <span className="pl-1">min read</span>
                      </p>
                      <p className="text-xs text-neutral-500">
                        {format(post.post_upload_time, "MMM dd,yyyy")}
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
          <div className="w-2/4 pr-10">
            <h1 className="text-6xl leading-snug">
              Create and share your blog effortlessly.
            </h1>
          </div>
          <div className="w-2/4 pl-10">
            <p className="leading-relaxed">
              "Empower your voice with our blog platform, where you can
              effortlessly create and share your stories, building a community
              around your ideas that grows with you."
            </p>
            <Link to={"/SignUp"}>
              <button className="flex flex-row items-center mt-5 text-black transition duration-150 delay-150 hover:text-orange-500">
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
              <Card
                sx={{
                  maxWidth: 320,
                }}
                elevation={3}
              >
                <CardActionArea>
                  <div className="flex flex-row items-center justify-center w-full h-20 mt-10 mb-10">
                    <img className="w-20 h-20" src={card.src} />
                  </div>
                  <CardContent>
                    <p className="flex flex-row items-center justify-center text-xl font-bold text-orange-500">
                      {" "}
                      {card.title}
                    </p>
                    <Typography
                      sx={{ m: 2 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      <p className="flex flex-row mb-1 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                          stroke="rgb(249, 115, 22)"
                          class="w-6 h-6 mr-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        {card.pt1}
                      </p>
                      <p className="flex flex-row mt-1 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                          stroke="rgb(249, 115, 22)"
                          class="w-6 h-6 mr-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        {card.pt2}
                      </p>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-start justify-start w-10/12">
          <h1 className="text-2xl font-bold text-orange-500">FAQS</h1>
          <div className="mt-10">
            <Accordion
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
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
