import React, { useContext, useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./Header.css";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { createContext } from "react";
import BookIcon from "@mui/icons-material/Book";
const pages = ["Read Blog"];
const settings = ["Account", "Dashboard"];
import { useNavigate } from "react-router-dom";
import ImageComponent from "../../../utils/ImageComponent";
import useSearch from "../../../hooks/useSearch";
import { Input } from "@mui/material";
import { FetchContinous } from "../search/search";
import axios from "../../../api/axios";

import SearchVideo from "../../../public/Search.mp4";

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

const userUpdater = createContext({});

export const Navbar = () => {
  const { user, setAuth, setUser } = useAuth();
  const navigate = useNavigate();
  const [userFunc, setUserFunc] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { searchOpen, setSearchOpen } = useSearch();

  const GOOGLE_USER = `/login/success`;

  const getUser = async () => {
    try {
      const response = await axios.get(GOOGLE_USER);
      console.log(response);
      const accessToken = response?.data?.data?.accessToken;
      localStorage.setItem("accessToken", accessToken);
      const { user_name, user_email, user_id, profileimage } = response?.data?.data;
      setAuth({
        Gmail: user_email,
        user_id: user_id,
        accessToken,
      });
      setUser({
        Gmail: user_email,
        user_name: user_name,
        user_id: user_id,
        profileimage: profileimage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    color: "inherit",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
    backgroundColor: "inherit",
  }));

  const handleLogout = () => {
    console.log("Logout Success!!");
    localStorage.clear();
    setAuth({});
    setUser({});
    window.open("http://localhost:5000/logouts", "_self")
    navigate("/SignUp");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const InputReader = useRef("");

  const [inputTracker, setinputTracker] = useState("");

  const handleForSearchNavMenu = () => {
    setSearchOpen((prev) => {
      if (prev === undefined) {
        return true;
      }
      return !prev;
    });
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <userUpdater.Provider value={setUserFunc}>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: "#fffefd",
          borderBottom: "0.5px solid #d1cfcd",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        position="static" /* Previous it was Sticky */
      >
        <Container maxWidth="xl">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: "57px",
            }}
          >
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                width: "40%",
                mr: 2,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: ".6rem",
                color: "#303030",
                textDecoration: "none",
              }}
            >
              <BookIcon
                fontSize="medium"
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: "#ff6500",
                }}
              />
              INK <span className="text-orange-500">WELLIFY</span>
            </Typography>

            {user.user_name && (
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="small"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="#303030"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    sx={{ display: "flex", flexDirection: "column" }}
                    onClick={handleCloseNavMenu}
                  >
                    <Link to={"/createpost"}>
                      <Typography
                        mt={"6px"}
                        mb={"6px"}
                        sx={{
                          marginRight: "2px",
                          marginLeft: "2px",
                          fontSize: "12px",
                          color: "#303030",
                        }}
                        textAlign="center"
                      >
                        Create Post
                      </Typography>
                    </Link>
                    <Tooltip title="Search">
                      {" "}
                      {/* Mobile View */}
                      <Button
                        onClick={handleForSearchNavMenu}
                        sx={{
                          my: 2,
                          color: "#303030",
                          display: "block",
                          fontSize: "16px",
                          paddingRight: "10px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                      </Button>
                    </Tooltip>

                    <Tooltip title="Read">
                      <Link to={`/read`}>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 2,
                            color: "#303030",
                            display: "block",
                            fontSize: "16px",
                            paddingRight: "10px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height={24}
                            viewBox="0 0 30 30"
                            id="blog"
                            width={24}
                          >
                            <g>
                              <path d="M26 12h-2V8a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v12a1 1 0 0 0 2 0V8a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v5a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3 1 1 0 0 0-2 0 5 5 0 0 0 5 5h16a5 5 0 0 0 5-5v-9a3 3 0 0 0-3-3Z"></path>
                              <path d="M11.5 14h4a2.5 2.5 0 0 0 0-5h-4a2.5 2.5 0 0 0 0 5zm0-3h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1zm0 12h9a2.5 2.5 0 0 0 0-5h-9a2.5 2.5 0 0 0 0 5zm0-3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1z"></path>
                            </g>
                          </svg>
                        </Button>
                      </Link>
                    </Tooltip>

                    <Tooltip title="LeaderBoard">
                      <Link to={`/leaderboard`}>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 2,
                            color: "#303030",
                            display: "block",
                            fontSize: "16px",
                            paddingRight: "10px",
                          }}
                        >
                          {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <rect fill="none" height="24" width="24" />
                      <g>
                        <path d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z" />
                      </g>
                    </svg> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enable-background="new 0 0 24 24"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <g>
                              <path
                                d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z"
                                fill="none"
                                stroke="#000000"
                                stroke-width="1.5"
                              />
                            </g>
                          </svg>
                        </Button>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Notification">
                      <Link to={`/notification`}>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 2,
                            color: "#303030",
                            display: "block",
                            fontSize: "16px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-9 h-9 pl-3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                          </svg>
                        </Button>
                      </Link>
                    </Tooltip>
                  </MenuItem>
                </Menu>
              </Box>
            )}

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#0e0a07",
                textDecoration: "none",
              }}
            >
              <BookIcon
                fontSize="small"
                sx={{
                  display: { xs: "flex", md: "none", color: "#ff6500" },
                  mr: 1,
                }}
              />
              INK
              <span className="text-orange-500">WELLIFY</span>
            </Typography>

            {/* {Object.keys(user).length === 0 && (
              <Link to={"Search"} className="max-md:hidden">
                <Item elevation={1}>
                  <button className="flex flex-row items-center justify-center text-gray-700 shadow-base max-md:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 pr-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                    Search
                  </button>
                </Item>
              </Link>
            )} */}

            {/* {Object.keys(user).length !== 0 && (
              <Tooltip title="Searc">
                <Link to={"/Search"} className="text-gray-900 md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </Link>
              </Tooltip>
            )} */}

            {user.user_name && (
              <div
                id="create"
                className="flex flex-row items-center justify-center"
              >
                <Link to={"/createpost"}>
                  <button
                    onClick={handleCloseNavMenu}
                    className="flex flex-row items-center justify-center pt-1 pb-1 pl-3 pr-3 text-sm text-gray-900 border border-gray-400 rounded-full shadow-md hover:text-orange-500 hover:border-orange-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 pr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <span className="pr-1">Create </span> Post
                  </button>
                </Link>
              </div>
            )}

            <div
              id="sign"
              className="flex flex-row items-center justify-center"
            >
              {user.user_name ? (
                <Tooltip title="Open settings">
                  <button className="w-10 h-10" onClick={handleOpenUserMenu}>
                    {console.log(user.profileimage)}
                    {/* <img
                      className="w-full h-full text-gray-700 rounded-full"
                      color="#303030"
                      alt={user.user_name}
                      src={
                        user.profileimage
                          ? `http://localhost:5000/${user.profileimage}`
                          : "../../../public/Profile.jpeg"
                      }
                    /> */}

                    {user.profileimage ? (
                      <ImageComponent
                        base64String={user.profileimage}
                        features={"w-full h-full text-gray-700 rounded-full"}
                        altName={user.user_name}
                      />
                    ) : (
                      <img
                        className="w-full h-full text-gray-700 rounded-full"
                        color="#303030"
                        alt={user.user_name}
                        src={"../../../public/Profile.jpeg"}
                      />
                    )}
                  </button>
                </Tooltip>
              ) : (
                <Link to={"/SignUp"}>
                  <Tooltip title="SignUp / Login">
                    <button className="pt-1 pb-1 pl-3 pr-3 text-base font-medium bg-orange-500 rounded-full text-gray-50 hover:bg-gray-50 hover:text-orange-500 hover:border hover:border-orange-500 active:bg-white active:text-orange-500">
                      Get Started
                    </button>
                  </Tooltip>
                </Link>
              )}
            </div>

            <Box
              sx={{
                width: "40%",
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "right",
                textDecoration: {
                  textDecoration: "none",
                },
              }}
            >
              {user.user_name && (
                <>
                  {/* Wide View */}
                  <Tooltip title="Search">
                    {/* <Link to={`/search`}> */}
                    <Button
                      onClick={handleForSearchNavMenu}
                      sx={{
                        my: 2,
                        color: "#303030",
                        display: "block",
                        fontSize: "16px",
                        paddingRight: "10px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </svg>
                    </Button>
                    {/* </Link> */}
                  </Tooltip>

                  <Tooltip title="Read">
                    <Link to={`/read`}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          color: "#303030",
                          display: "block",
                          fontSize: "16px",
                          paddingRight: "10px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height={24}
                          viewBox="0 0 30 30"
                          id="blog"
                          width={24}
                        >
                          <g>
                            <path d="M26 12h-2V8a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v12a1 1 0 0 0 2 0V8a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v5a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3 1 1 0 0 0-2 0 5 5 0 0 0 5 5h16a5 5 0 0 0 5-5v-9a3 3 0 0 0-3-3Z"></path>
                            <path d="M11.5 14h4a2.5 2.5 0 0 0 0-5h-4a2.5 2.5 0 0 0 0 5zm0-3h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1zm0 12h9a2.5 2.5 0 0 0 0-5h-9a2.5 2.5 0 0 0 0 5zm0-3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1z"></path>
                          </g>
                        </svg>
                      </Button>
                    </Link>
                  </Tooltip>

                  <Tooltip title="LeaderBoard">
                    <Link to={`/leaderboard`}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          color: "#303030",
                          display: "block",
                          fontSize: "16px",
                          paddingRight: "10px",
                        }}
                      >
                        {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <rect fill="none" height="24" width="24" />
                      <g>
                        <path d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z" />
                      </g>
                    </svg> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enable-background="new 0 0 24 24"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <g>
                            <path
                              d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z"
                              fill="none"
                              stroke="#000000"
                              stroke-width="1.5"
                            />
                          </g>
                        </svg>
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Notification">
                    <Link to={`/notification`}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          color: "#303030",
                          display: "block",
                          fontSize: "16px",
                          paddingRight: "10px",
                        }}
                      >
                        {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <rect fill="none" height="24" width="24" />
                      <g>
                        <path d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z" />
                      </g>
                    </svg> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-9 h-9 pl-3 m-0"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </Tooltip>
                </>
              )}

              <Box
                sx={{
                  flexGrow: 0,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50px",
                }}
              >
                {user.user_name ? (
                  <Tooltip title="Open settings">
                    <button
                      className="w-8 h-8"
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      {/* <img
                        className="w-full h-full text-gray-500 rounded-full"
                        alt={user.user_name}
                        src={
                          user.profileimage !== null
                            ? `http://localhost:5000/${user.profileimage}`
                            : "../../../public/Profile.jpeg"
                        }
                      /> */}
                      {user.profileimage ? (
                        <ImageComponent
                          altName={user.user_name}
                          features={"w-full h-full text-gray-500 rounded-full"}
                          base64String={user.profileimage}
                        />
                      ) : (
                        <img
                          className="w-full h-full text-gray-500 rounded-full"
                          alt={user.user_name}
                          src={"../../../public/Profile.jpeg"}
                        />
                      )}
                    </button>
                  </Tooltip>
                ) : (
                  <Link to={"/SignUp"}>
                    <Tooltip title="SignUp / Login">
                      <button className="pt-1 pb-1 pl-3 pr-3 text-base font-medium bg-orange-500 rounded-full text-gray-50 hover:bg-gray-50 hover:text-orange-500 hover:border hover:border-orange-500 active:bg-white active:text-orange-500">
                        Get Started
                      </button>
                    </Tooltip>
                  </Link>
                )}
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    sx={{ display: "flex", flexDirection: "column" }}
                    onClick={handleCloseUserMenu}
                  >
                    <Link to={`/${user.user_name}`}>
                      <Typography
                        variant="body1"
                        sx={{ mt: "6px", mb: "6px" }}
                        textAlign="center"
                      >
                        Profile
                      </Typography>
                    </Link>

                    {settings.map((setting) => (
                      <Link to={`/${setting}`}>
                        <Typography
                          sx={{
                            mt: "6px",
                            mb: "6px",
                          }}
                          textAlign="center"
                        >
                          {setting}
                        </Typography>
                      </Link>
                    ))}
                    <Typography
                      onClick={handleLogout}
                      variant="body1"
                      sx={{ mt: "6px", mb: "6px" }}
                      textAlign="center"
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </div>
        </Container>
      </AppBar>
      {searchOpen && (
        <div className="absolute z-50 flex flex-row justify-center w-full h-screen">
          <div className="relative flex flex-col w-3/4 overflow-y-scroll bg-white border shadow-lg h-3/4 rounded-b-xl max-md:w-full">
            <Tooltip title="Close">
              <button
                className="absolute right-2 top-2"
                onClick={() => setSearchOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Tooltip>

            <div className="flex flex-col items-center h-full max-md:w-full">
              <input
                className="w-3/4 h-10 pt-2 pb-2 pl-5 mt-10 text-base border-2 border-gray-700 rounded-full Yoo max-md:w-11/12 bg-inherit max-md:text-sm focus:outline-none"
                placeholder="search anything..."
                ref={InputReader}
                onChange={() => {
                  setinputTracker(InputReader.current.value);
                }}
              ></input>
              {inputTracker ? (
                <FetchContinous keyword={inputTracker} />
              ) : (
                <div className="flex flex-row items-center justify-center w-full h-full">
                  <video
                    autoPlay
                    loop
                    controls={false}
                    width={"50%"}
                    height={"50%"}
                    playsInline
                  >
                    <source src={SearchVideo} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </userUpdater.Provider>
  );
};
