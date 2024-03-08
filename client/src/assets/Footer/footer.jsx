import BookIcon from "@mui/icons-material/Book";
import React from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export const Footer = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full h-56 mt-10 bg-orange-500 rounded-t-xl">
      <div className="w-10/12">
        <div className="flex flex-row items-center">
          {/* <BookIcon
            fontSize="large"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "#fffefd",
            }}
          /> */}
          <p className="text-3xl font-bold text-gray-50 max-md:text-xl">
            InkWellify
          </p>
        </div>
        <div className="mt-5">
          <p className="text-gray-50 max-md:text-sm">
            © 2024 Inkwellify. All Rights Reserved. Designed and Developed by
            <span className="hover:font-bold hover:cursor-pointer">
              {" "}
              Vanamuthu V
            </span>
            .
          </p>
        </div>
        <div className="mt-5">
          <a href="mailto:vanamuthuvana22@gmail.com">
            <EmailIcon sx={{ marginRight: "5px", color: "#fffefd" }} />
          </a>
          <Link to={"https://x.com/VanamuthuV?t=hkCJldDqO6l1oqrjYnjloA&s=08"}>
            <XIcon
              sx={{ marginLeft: "5px", marginRight: "5px", color: "#fffefd" }}
            />
          </Link>
          <Link
            to={
              "https://www.linkedin.com/in/vanamuthuv?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            }
          >
            <LinkedInIcon
              sx={{ marginLeft: "5px", marginRight: "5px", color: "#fffefd" }}
            />
          </Link>
          <Link
            to={"https://www.instagram.com/iamvanamuthu/?igsh=c214NDVxZmY5MXk1"}
          >
            <InstagramIcon sx={{ marginLeft: "5px", color: "#fffefd" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};
