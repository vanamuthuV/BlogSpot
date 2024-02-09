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
const pages = ["Search", "Read Blog", "Contact"];
const settings = ["Account", "Dashboard"];
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

const userUpdater = createContext({});

export const Navbar = () => {
  const { user, setAuth, setUser } = useAuth();
  const navigate = useNavigate();
  const [userFunc, setUserFunc] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    navigate("/SignUp")
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
        sx={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #303030" }}
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
              noWrap
              component="a"
              href="/"
              sx={{
                width: "40%",
                mr: 2,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                fontSize: "26px",
                fontWeight: 700,
                fontFamily: "Space Mono",
                letterSpacing: ".6rem",
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
            )}

            <BookIcon
              fontSize="small"
              sx={{
                display: { xs: "flex", md: "none", color: "#303030" },
                mr: 1,
              }}
            />
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
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#303030",
                textDecoration: "none",
              }}
            >
              INKWELLIFY
            </Typography>

            {Object.keys(user).length === 0 && (
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
            )}

            {Object.keys(user).length === 0 && (
              <Tooltip title="Search">
                <Link to={"/Search"} className="text-gray-700 md:hidden">
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
            )}

            {user.user_name && (
              <div
                id="create"
                className="flex flex-row items-center justify-center"
              >
                <Link to={"/createpost"}>
                  <button
                    onClick={handleCloseNavMenu}
                    className="flex flex-row items-center justify-center pt-1 pb-1 pl-3 pr-3 text-lg text-gray-700 shadow-md rounded-xl font-Mono"
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
                    CREATE POST
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
                    <img
                      className="w-full h-full text-gray-700 rounded-full"
                      color="#303030"
                      alt={user.user_name}
                      src={
                        user.profileimage
                          ? `http://localhost:5000/${user.profileimage}`
                          : "../../../public/Profile.jpeg"
                      }
                    />
                  </button>
                </Tooltip>
              ) : (
                <Link to={"/SignUp"}>
                  <Tooltip title="SignUp / Login">
                    <button className="pt-1 pb-1 pl-2 pr-2 ml-5 font-light text-white transition duration-300 delay-100 bg-gray-800 border border-gray-700 rounded-lg hover:text-gray-800 hover:bg-white active:bg-white active:text-gray-800 max-md:text-xs">
                      SIGN UP
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
              {user.user_name &&
                pages.map((page) => (
                  <Link to={`/${page}`}>
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "#303030",
                        display: "block",
                        fontFamily: "Space Mono",
                        fontSize: "16px",
                        paddingRight: "10px",
                      }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))}

              <Box
                sx={{ flexGrow: 0, cursor: "pointer", alignItems: "center" }}
              >
                {user.user_name ? (
                  <Tooltip title="Open settings">
                    <button
                      className="w-10 h-10"
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    >
                      <img
                        className="w-full h-full text-gray-500 rounded-full"
                        alt={user.user_name}
                        src={
                          user.profileimage !== null
                            ? `http://localhost:5000/${user.profileimage}`
                            : "../../../public/Profile.jpeg"
                        }
                      />
                    </button>
                  </Tooltip>
                ) : (
                  <Link to={"/SignUp"}>
                    <Tooltip title="SignUp / Login">
                      <button className="pt-1 pb-1 pl-3 pr-3 text-base font-medium text-white transition duration-500 bg-gray-800 border border-gray-800 rounded-full hover:bg-white hover:text-gray-800 active:bg-white active:text-gray-800">
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
                        sx={{ mt: "6px", mb: "6px", fontFamily: "Space Mono" }}
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
    </userUpdater.Provider>
  );
};
