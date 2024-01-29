import React, { useContext, useState } from "react";
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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "./Header.css";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { SignUp } from "../SignUp/SignUp";
import useAuth from "../../../hooks/useAuth";
import { createContext } from "react";
import BookIcon from "@mui/icons-material/Book";

const pages = ["Read Blog", "Contact", "About"];
const settings = ["Profile", "Account", "Dashboard"];

const userUpdater = createContext({});

export const Navbar = () => {
  const { user, setAuth, setUser } = useAuth();

  const [userFunc, setUserFunc] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = () => {
    console.log("Logout Success!!");
    localStorage.clear();
    setAuth({});
    setUser({});
    return <Navigate to={'/'} />
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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(user);

  return (
    <userUpdater.Provider value={setUserFunc}>
      <AppBar
        elevation={0}
        sx={{ backgroundColor: "#f5f5f5", border: "1px solid #303030" }}
        position="sticky"
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                width: "40%",
                mr: 2,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                fontWeight: 700,
                letterSpacing: "1rem",
                color: "#303030",
                textDecoration: "none",
              }}
            >
              <BookIcon
                fontSize="large"
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: "#303030",
                }}
              />
              INKWELLIFY
            </Typography>

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
                        fontFamily: "Space Mono",
                        fontSize: "12px",
                        color: "#303030",
                      }}
                      textAlign="center"
                    >
                      Create Post
                    </Typography>
                  </Link>
                  {pages.map((page) => (
                    <Link to={`/${page}`}>
                      <Typography
                        mt={"6px"}
                        mb={"6px"}
                        sx={{
                          marginRight: "2px",
                          marginLeft: "2px",
                          fontSize: "12px",
                          fontFamily: "Space Mono",
                        }}
                        textAlign="center"
                      >
                        {page}
                      </Typography>
                    </Link>
                  ))}
                </MenuItem>
              </Menu>
            </Box>
            <BookIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Space Mono",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#303030",
                textDecoration: "none",
              }}
            >
              INKWELLIFY
            </Typography>

            <div id="create" className="flex justify-center itms-center flaex-row ">
              <Link to={"/createpost"}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "#303030",
                    display: "block",
                    fontFamily: "Space Mono",
                    fontSize: "16px",
                  }}
                >
                  Create Post
                </Button>
              </Link>
            </div>
            <div id="sign" className="flex flex-row items-center justify-center">
              {user.user_name ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography
                      sx={{
                        my: 2,
                        color: "#303030",
                        display: "block",
                        fontFamily: "Space Mono",
                      }}
                    >
                      {user.user_name}
                    </Typography>
                  </IconButton>
                </Tooltip>
              ) : (
                <Link to={"/SignUp"}>
                  <Tooltip title="SignUp / Login">
                    <button
                      className="pt-1 pb-1 pl-2 pr-2 font-light text-gray-900 border border-gray-900 rounded-xl"
                      // sx={{
                      //   my: 2,
                      //   color: "#303030",
                      //   display: "block",
                      //     fontFamily: "Space Mono",
                      //     fontWeight : "500",
                      //   fontSize: "12px",

                      // }}
                    >
                      Sign Up
                    </button>
                  </Tooltip>
                </Link>
              )}
            </div>

            <Box
              sx={{
                // flexGrow: 1,
                width: "40%",
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "right",
                textDecoration: {
                  textDecoration: "none",
                },
              }}
            >
              {pages.map((page) => (
                <Link to={`/${page}`}>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "#303030",
                      display: "block",
                      fontFamily: "Space Mono",
                      fontSize: "14px",
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
              <Box sx={{ flexGrow: 0, cursor: "pointer" }}>
                {user.user_name ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Typography
                        sx={{
                          my: 2,
                          color: "#303030",
                          display: "block",
                          fontFamily: "Space Mono",
                        }}
                      >
                        {user.user_name}
                      </Typography>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Link to={"/SignUp"}>
                    <Tooltip title="SignUp / Login">
                      <button
                        className="pt-1 pb-1 pl-2 pr-2 font-light text-gray-900 border border-gray-900 rounded-xl"
                        // sx={{
                        //   my: 2,
                        //   color: "#303030",
                        //   display: "block",
                        //     fontFamily: "Space Mono",
                        //     fontWeight : "500",
                        //   fontSize: "12px",

                        // }}
                      >
                        Sign Up
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
                    {settings.map((setting) => (
                      <Link to={`/${user.user_name}`}>
                        <Typography
                          sx={{
                            mt: "6px",
                            mb: "6px",
                            fontFamily: "Space Mono",
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
                      sx={{ mt: "6px", mb: "6px", fontFamily: "Space Mono" }}
                      textAlign="center"
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* <nav>
        <div className="flex items-center justify-between row-auto mt-5 mb-5 ml-3 mr-3">
          <Link to={"/"}>
            <div className="flex items-center justify-between row-auto">
              <img
                width={28}
                className="ml-3 mr-3"
                src="../public/navbar/BlogSpot.svg"
                alt="BlogSpot-Logo"
              />
              <h1 className="text-2xl font-medium">BLOGSPOT</h1>
            </div>
          </Link>
          <div>
            <Link to={'/createpost'}>
              <p>Create Blog</p>
            </Link>
          </div>
          <div className="flex row-auto ">
            {NavElements.map((items) => {
              return (
                <Link to={`/${items}`}>
                  <li className="ml-5 mr-5 text-lg font-normal list-none cursor-pointer">
                    <a href="">{items}</a>
                  </li>
                </Link>
              );
            })}
              {user.user_name ? (
                <div className="flex-col justify-center align-middle">
                  <li
                    onClick={() => {
                      setUserFunc((prev) => !prev);
                    }}
                    className="pl-10 pr-10 ml-5 mr-5 text-lg font-normal list-none border cursor-pointer"
                  >
                    {user.user_name} <span style={{ color: "gray" }}>v</span>{" "}
                  </li>
                  {userFunc && <UserFunctionality />}
                </div>
              ) : (
                <Link to={"/SignUp"}>
                  <li className="ml-5 mr-5 text-lg font-normal list-none cursor-pointer">
                    Sign Up
                  </li>
                </Link>
              )}
          </div>
        </div>
      </nav> */}
    </userUpdater.Provider>
  );
};
