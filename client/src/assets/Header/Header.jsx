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

const NavElements = [];

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
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BLOGSPOT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
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
                        fontFamily: "Fira Code",
                      }}
                      textAlign="center"
                    >
                      Create Post
                    </Typography>
                  </Link>
                  {pages.map((page) => (
                    <Typography
                      mt={"6px"}
                      mb={"6px"}
                      sx={{
                        marginRight: "2px",
                        marginLeft: "2px",
                        fontFamily: "Fira Code",
                      }}
                      textAlign="center"
                    >
                      {page}
                    </Typography>
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
                fontFamily: "Fira Code",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BLOGSPOT
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "right",
              }}
            >
              <Link to={"/createpost"}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mt: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "Fira Code",
                  }}
                >
                  Create Post
                </Button>
              </Link>
              {pages.map((page) => (
                <Link to={`/${page}`}>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontFamily: "Fira Code",
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, cursor: "pointer" }}>
              {user.user_name ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {user.user_name}
                    </Typography>
                  </IconButton>
                </Tooltip>
              ) : (
                <Link to={"/SignUp"}>
                  <Tooltip title="SignUp / Login">
                    <Typography
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Sign Up
                    </Typography>
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
                    <Typography
                      sx={{ mt: "6px", mb: "6px" }}
                      textAlign="center"
                    >
                      {setting}
                    </Typography>
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
