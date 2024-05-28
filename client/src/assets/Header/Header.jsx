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
      const { user_name, user_email, user_id, profileimage, platform } =
        response?.data?.data;
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
        platform: platform,
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
    window.open("http://localhost:5000/logouts", "_self");
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
                    <Tooltip title="Search">
                      {" "}
                      {/* Mobile View */}
                      <button
                        onClick={handleForSearchNavMenu}
                        className="flex flex-row items-center justify-center mt-2 mb-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-4 mr-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="text-xs ">Search</span>
                      </button>
                    </Tooltip>
                    <Link to={"/createpost"}>
                      <button
                        className="flex flex-row items-center mt-2 mb-2"
                        onClick={handleCloseNavMenu}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 mr-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>

                        <span className="text-xs">Create Post</span>
                      </button>
                    </Link>

                    <Tooltip title="Read">
                      <Link to={`/read`}>
                        <button
                          onClick={handleCloseNavMenu}
                          className="flex flex-row items-center justify-center mt-2 mb-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-4 mr-1"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                            />
                          </svg>

                          <span className="text-xs">Read Blogs</span>
                        </button>
                      </Link>
                    </Tooltip>

                    <Tooltip title="LeaderBoard">
                      <Link to={`/leaderboard`}>
                        <button
                          onClick={handleCloseNavMenu}
                          className="flex flex-row items-center justify-center mt-2 mb-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-4 mr-1"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                            />
                          </svg>

                          <span className="text-xs">Leaderboard</span>
                        </button>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Notification">
                      <Link to={`/notification`}>
                        <button
                          onClick={handleCloseNavMenu}
                          className="flex flex-row items-center justify-center mt-2 mb-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-4 mr-1"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                            />
                          </svg>

                          <span className="text-xs">Notification</span>
                        </button>
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
                        color: "#303030",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Button>
                    {/* </Link> */}
                  </Tooltip>

                  <Tooltip title="Read">
                    <Link to={`/read`}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                          color: "#303030",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </Tooltip>

                  <Tooltip title="LeaderBoard">
                    <Link to={`/leaderboard`}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                          color: "#303030",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Notification">
                    <Link to={`/notification`}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                          color: "#303030",
                          marginRight: "10px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
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
