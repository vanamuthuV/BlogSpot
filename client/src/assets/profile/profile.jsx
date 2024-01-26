import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import UploadIcon from "@mui/icons-material/Upload";
import { Divider, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import ReactQuill from "react-quill";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import { Link, useParams } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import DEFAULT from "../../../public/BLOGSPOT.png";
import DeFAULTPROF from "../../../public/Profile.jpeg";
import { format } from "date-fns";
import "./profile.css"

const SETPERSONALDETAILS = "/addpersonaldetails";
const SETPROFILE = "/setprofileimage";
const SETCOVER = "/setcoverimage";
const GETPROFILEIMAGE = "/getprofileimage";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export const Profile = (user_name) => {
  const username = user_name.user_name;
  console.log(username);
  const [coverShow, setCoverShow] = useState();
  const CoverFiles = useRef();
  const [filename, setFilename] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilename, setProfilename] = useState("");
  const Profile = useRef();
  const [loading, setLoading] = useState(true);

  const [publicPost, setPublicPost] = useState([]);
  const [privatePost, setPrivatePost] = useState([]);

  const { user } = useAuth();
  console.log({ user_name });
  const [ProfileImage, setProfileImage] = useState();
  const [CoverImage, setCoverImage] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [ProfileInfo, setProfileInfo] = useState({});

  const Name = useRef(null);
  const DOF = useRef(null);
  const BIO = useRef("");
  const Role = useRef(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [role, setRole] = useState("");
  const [follwers, setFollwers] = useState();
  const [following, setFollowing] = useState();

  const data = {
    user_name: user_name,
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(GETPROFILEIMAGE, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response?.data?.data);
        setProfileImage(
          response?.data?.data?.profilestatus[0].profileimage ||
            response?.data?.data?.profilestatus
        );
        console.log(response?.data?.data?.profilestatus[0].profileimage);
        setCoverImage(
          response?.data?.data?.coverstatus[0].coverimage ||
            response?.data?.data?.coverstatus
        );
        setUserDetails(response?.data?.data?.userDetails[0]);
        setProfileInfo(response?.data?.data?.ProfileInfo[0]);
        setName(response?.data?.data?.ProfileInfo[0].userfullname || "");
        setBio(response?.data?.data?.ProfileInfo[0].bio || "");
        setBirthDay(response?.data?.data?.ProfileInfo[0].dateofbirth || "");
        setRole(response?.data?.data?.ProfileInfo[0].role || "");
        setPublicPost(response?.data?.data?.PublicPost);
        setPrivatePost(response?.data?.data?.PrivatePost);

        console.log(CompleteProfileChecker);
        for (const key in response?.data?.data?.ProfileInfo[0]) {
          if (response?.data?.data?.ProfileInfo[0][key] === "") {
            setCompleteProfileChecker(true);
            console.log("I'm Breaking");
          }
        }
        console.log(CompleteProfileChecker);
        console.log(ProfileInfo);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const ProfileName = () => {
    setProfilePic(Profile.current.files[0]);
    setProfilename(Profile.current.files[0].name);
  };

  const [profilestate, setprofileState] = React.useState({
    bottom: false,
  });

  const [state, setState] = React.useState({
    bottom: false,
  });

  const ProfilePictureUpdater = async () => {
    const formdata = new FormData();
    formdata.append("user_id", user.user_id);
    formdata.append("media", profilePic);

    if (ProfileImage === "NO") {
      try {
        const response = await axios.post(SETPROFILE, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        });

        console.log(response?.data?.data);
        setProfileImage(response?.data?.data[0].profileimage);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.put(SETPROFILE, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        });

        console.log(response?.data?.data);
        setProfileImage(response?.data?.data[0].profileimage);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const CoverPictureUpdater = async () => {
    const data = new FormData();
    data.set("user_id", user.user_id);
    data.set("media", coverShow);

    if (CoverImage === "NO") {
      try {
        console.log(data);
        const response = await axios.post(SETCOVER, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Adjust the content type as needed
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        });
        console.log(response?.data?.data);
        setCoverImage(response?.data?.data[0].coverimage);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.put(SETCOVER, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Adjust the content type as needed
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        });
        console.log(response?.data?.data);
        setCoverImage(response?.data?.data[0].coverimage);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const PrintName = () => {
    setCoverShow(CoverFiles.current.files[0]);
    setFilename(CoverFiles.current.files[0].name);
  };

  const ProfileToggle = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setprofileState({ ...profilestate, [anchor]: open });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const Profilelist = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        position: "relative",
      }}
      role="presentation"
    >
      <List>
        <ListItem key={"Take Photo"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CameraAltIcon />
            </ListItemIcon>
            <ListItemText itemType="input" primary={"Take Photo"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Upload Photo"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <UploadIcon />
            </ListItemIcon>
            <div>
              <label htmlFor="files">Upload Photo</label>
              <input
                ref={Profile}
                onChange={ProfileName}
                id="files"
                style={{ visibility: "hidden" }}
                className="w-5 cursor-pointer"
                type="file"
              />
              <p className="inline">
                {profilename.length <= 18
                  ? profilename
                  : profilename.substring(0, 5) +
                    "..." +
                    profilename.substring(
                      profilename.length - 10,
                      profilename.length
                    )}
              </p>
              <button
                onClick={ProfilePictureUpdater}
                className="pt-1 pb-1 pl-3 pr-3 ml-2.5 bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-2 border-gray-800 border-solid rounded-lg "
              >
                Submit
              </button>
            </div>
          </ListItemButton>
        </ListItem>
      </List>
      <button
        className="absolute top-2 right-3"
        onClick={ProfileToggle(anchor, false)}
        onKeyDown={ProfileToggle(anchor, false)}
      >
        <CloseIcon />
      </button>
    </Box>
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ font: ["Fira Code"] }],
      [{ align: [] }][("link", "image")],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const Coverlist = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        position: "relative",
      }}
      role="presentation"
    >
      <List>
        <ListItem key={"Take Photo"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CameraAltIcon />
            </ListItemIcon>
            <ListItemText itemType="input" primary={"Take Photo"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Upload Photo"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <UploadIcon />
            </ListItemIcon>
            <div>
              <label htmlFor="files">Upload Photo</label>
              <input
                ref={CoverFiles}
                onChange={PrintName}
                id="files"
                style={{ visibility: "hidden" }}
                className="w-5 cursor-pointer"
                type="file"
              />
              <p className="inline">
                {filename.length <= 18
                  ? filename
                  : filename.substring(0, 5) +
                    "..." +
                    filename.substring(filename.length - 10, filename.length)}
              </p>
              <button
                onClick={CoverPictureUpdater}
                className="pt-1 pb-1 pl-3 pr-3 ml-2.5 bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-2 border-gray-800 border-solid rounded-lg "
              >
                Submit
              </button>
            </div>
          </ListItemButton>
        </ListItem>
      </List>
      <button
        className="absolute top-2 right-3"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <CloseIcon />
      </button>
    </Box>
  );

  const [ShowDialogCP, setShowDialogCP] = useState(false);

  const CompleteProfile = () => {
    setShowDialogCP((prev) => !prev);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [CompleteProfileChecker, setCompleteProfileChecker] = useState(false);

  const PersonalDetails = async (ev) => {
    ev.preventDefault();
    console.log(typeof Object.keys(ProfileInfo).length);

    if (Object.keys(ProfileInfo).length === 0) {
      console.log(name);
      console.log(bio);
      console.log(birthDay);
      console.log(role);

      const data = {
        user_id: user.user_id,
        name: name,
        dof: birthDay,
        bio: bio,
        role: role,
      };

      try {
        const response = await axios.post(SETPERSONALDETAILS, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
        setProfileInfo(response?.data?.data[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(name);
      console.log(bio);
      console.log(birthDay);
      console.log(role);

      const data = {
        user_id: user.user_id,
        name: name,
        dof: birthDay,
        bio: bio,
        role: role,
      };

      try {
        const response = await axios.put(SETPERSONALDETAILS, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
        setProfileInfo(response?.data?.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [ShowEditable, setShowEditable] = useState(false);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="w-5/6 max-md:w-full">
            <div className="relative w-full mt-5 mb-40 max-md:w-full max-md:mb-16 max-md:mt-0">
              <img
                className="w-full max-h-80 max-md:h-28 rounded-xl max-md:mt-0 max-md:rounded-b-xl max-md:rounded-t-none"
                src={
                  CoverImage === "NO"
                    ? DEFAULT
                    : `http://localhost:5000/${CoverImage}`
                }
              />
              {user.user_name === userDetails.user_name && (
                <div className="absolute flex flex-row items-center justify-end w-4/12 -bottom-20 right-10 max-md:-bottom-12 max-md:right-5">
                  {/* <Button variant="outlined" onClick={handleClickOpen}>
                  Open full-screen dialog
                </Button> */}
                  <button
                    className="flex flex-row items-center justify-center pt-1 pb-1 pl-2 pr-2 border border-gray-600 rounded max-md:text-xs"
                    onClick={handleClickOpen}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8 pr-2 max-md:w-5 max-md:h-5 max-md:pr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit Profile
                  </button>
                  <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                  >
                    <AppBar
                      sx={{ position: "relative", backgroundColor: "#303030" }}
                    >
                      <Toolbar>
                        <Typography
                          sx={{
                            ml: 2,
                            flex: 1,
                            fontFamily: "Space Mono",
                            fontSize: "18px",
                          }}
                          component="div"
                        >
                          Editing Profile
                        </Typography>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleClose}
                          aria-label="close"
                        >
                          <CloseIcon />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center justify-center w-3/4 mt-5">
                        <form
                          onSubmit={PersonalDetails}
                          className="flex flex-col w-full"
                        >
                          <label
                            htmlFor="name"
                            className="pb-5 text-xl font-bold"
                          >
                            Enter Your Full Name
                          </label>
                          <textarea
                            rows={"1"}
                            className="w-full p-4 mb-5 text-xl border-2 border-gray-600 resize-none rounded-xl focus:outline-none"
                            ref={Name}
                            onChange={() => setName(Name.current.value)}
                          >
                            {name}
                          </textarea>

                          {ProfileInfo.dateofbirth && (
                            <>
                              <label
                                htmlFor="dof"
                                className="pb-5 text-xl font-bold"
                              >
                                {ShowEditable && "Old "}Date Of Birth{" "}
                              </label>
                              <p
                                className="flex flex-row items-center w-full mb-5"
                                ref={DOF}
                                contentEditable={false}
                              >
                                {format(ProfileInfo.dateofbirth, "yyyy MMM dd")}
                                <button
                                  className="pl-10"
                                  onClick={() => {
                                    setShowEditable((prev) => !prev);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-8 h-8 pr-2 max-md:w-5 max-md:h-5 max-md:pr-1"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                  </svg>
                                </button>
                              </p>
                            </>
                          )}
                          {(ProfileInfo.dateofbirth === undefined ||
                            ShowEditable) && (
                            <>
                              <p className="pb-5 text-xl font-bold">
                                New Date Of Birth
                              </p>
                              <input
                                ref={DOF}
                                type="date"
                                id="dof"
                                className="p-4 mb-5 text-xl border-2 border-gray-600 resize-none rounded-xl focus:outline-none"
                                onChange={() => {
                                  setBirthDay(DOF.current.value);
                                }}
                                required
                              ></input>
                            </>
                          )}

                          <label
                            htmlFor="role"
                            className="pb-5 text-xl font-bold"
                          >
                            Who are you? (eg : Student, Professor, Developer
                            etc...)
                          </label>

                          <textarea
                            className="p-4 mb-5 text-xl border-2 border-gray-600 resize-none rounded-xl focus:outline-none"
                            rows={"1"}
                            ref={Role}
                            onChange={() => setRole(Role.current.value)}
                          >
                            {role}
                          </textarea>

                          <label
                            htmlFor="bio"
                            className="pb-2 text-xl font-bold"
                          >
                            Bio
                          </label>
                          <ReactQuill
                            className="w-3/4 ql-error min-h-5 max-md:w-5/6"
                            modules={modules}
                            formats={formats}
                            style={{
                              padding: "20px",
                              width: "100%",
                              border: "2px solid #4B5563",
                              borderRadius: "12px",
                              fontFamily: "Space Mono",
                            }}
                            value={bio}
                            ref={BIO}
                            onChange={() => {
                              console.log(BIO.current.value);
                              setBio(BIO.current.value);
                            }}
                          />
                          {/* <textarea
                            id="bio"
                            className="p-5 border-2 border-gray-600 resize-none rounded-xl focus:outline-none"
                            rows={"5"}
                            ref={BIO}
                            onChange={() => {
                              console.log(BIO.current.value);
                              setBio(BIO.current.value);
                            }}
                            contentEditable={true}
                          >
                            {bio}
                          </textarea> */}

                          <button type="submit">Update</button>
                        </form>
                      </div>
                    </div>
                  </Dialog>

                  {/* <button
                  className="flex flex-row items-center justify-center pt-1 pb-1 pl-2 pr-2 border border-gray-600 rounded max-md:text-xs"
                  onClick={CompleteProfile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-8 h-8 pr-2 max-md:w-5 max-md:h-5 max-md:pr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  Edit Profile
                </button> */}
                </div>
              )}

              <div
                className="absolute flex flex-row items-center justify-center w-64 rounded-full -bottom-32 max-md:-bottom-10 max-md:w-20 left-10 max-md:h-20"
                style={{ borderRadius: "50%" }}
              >
                <img
                  className="rounded-full min-w-64 min-h-64 max-w-64 max-h-64 max-md:min-w-28 max-md:min-h-28 max-md:max-w-28 max-md:max-h-28"
                  src={
                    ProfileImage === "NO"
                      ? DeFAULTPROF
                      : `http://localhost:5000/${ProfileImage}`
                  }
                />

                {user.user_name === userDetails.user_name &&
                  ["bottom"].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <button
                        onClick={ProfileToggle(anchor, true)}
                        className="absolute flex-row justify-center pt-2 pb-2 pl-2 pr-2 font-bold text-white bg-gray-900 rounded-full opacity-50 -right-1 bottom-10 items-9-center hover:opacity-100 max-md:-bottom-1 max-md:-right-5 max-md:pt-1.5 max-md:pb-1 max-md:pr-1 max-md:pl-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-7 h-7 pb-1 max-md:w-5 max-md:h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                          />
                        </svg>
                      </button>
                      <Drawer
                        anchor={anchor}
                        open={profilestate[anchor]}
                        // onClose={toggleDrawer(anchor, false)}
                      >
                        {Profilelist(anchor)}
                      </Drawer>
                    </React.Fragment>
                  ))}
              </div>
              <div className="absolute flex flex-col items-center justify-center top-5 right-5">
                {user.user_name === userDetails.user_name &&
                  ["bottom"].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <button
                        onClick={toggleDrawer(anchor, true)}
                        className="flex-row justify-center pt-2 pb-2 pl-2 pr-2 font-bold text-white bg-gray-900 rounded-full opacity-50 items-9-center hover:opacity-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-7 h-7 pb-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                          />
                        </svg>
                      </button>
                      <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        // onClose={toggleDrawer(anchor, false)}
                      >
                        {Coverlist(anchor)}
                      </Drawer>
                    </React.Fragment>
                  ))}
                {}
              </div>
            </div>

            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-row items-start justify-start w-11/12">
                <div className="w-full">
                  {(ProfileInfo.userfullname !== undefined || "") && (
                    <div className="flex flex-row items-center justify-start">
                      <h1 className="text-2xl font-black">
                        {ProfileInfo.userfullname}
                      </h1>
                      {/* {user.user_name === userDetails.user_name && (
                      <button className="pl-3">
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                    )} */}
                    </div>
                  )}

                  <h1 className="text-xl font-normal tex-gray-600 max-md:text-base">
                    @{userDetails.user_name}
                  </h1>
                  {ProfileInfo.bio && (
                    <div
                      className="mt-3 mb-1 max-md:text-sm"
                      dangerouslySetInnerHTML={{ __html: ProfileInfo.bio }}
                    >
                      {/* {ProfileInfo.bio} */}
                    </div>
                  )}
                  <div className="flex flex-row items-center mt-2 text-gray-600">
                    {(ProfileInfo.dateofbirth !== undefined || "") && (
                      <time className="flex flex-row items-center justify-start pr-4 max-md:text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 max-md:w-4 max-md:h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                          />
                        </svg>
                        <time className="pl-2">
                          {format(ProfileInfo.dateofbirth, "dd MMM yyyy")}
                        </time>
                      </time>
                    )}

                    <time className="flex flex-row items-center justify-start max-md:text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 max-md:w-4 max-md:h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                      <time className="pl-2">
                        Joined {format(userDetails.account_created, "MMM yyyy")}
                      </time>
                      {/* <ReactTimeAgo
                    date={userDetails.account_created}
                    locale="en-IN"
                  /> */}
                    </time>
                  </div>

                  {user.user_name === username && (
                    // (Object.keys(ProfileInfo).length === 0 ||
                    //   (Object.keys(ProfileInfo).length >= 0 &&
                    //     CompleteProfileChecker === true)) && (
                    <div className="flex flex-col items-center justify-center">
                      {/* {ShowDialogCP && (
                        <div className="flex flex-col items-center justify-center">
                          <form
                            onSubmit={PersonalDetails}
                            className="flex flex-col"
                          >
                            <label htmlFor="name"></label>
                            <input
                              value={name}
                              onChange={(e) => {
                                setName(Name.current.value);
                              }}
                              contentEditable={true}
                              ref={Name}
                              type="text"
                              id="name"
                              placeholder="Name"
                            />
                            <label htmlFor="dof">Date Of Birth </label>
                            <input
                              value={Date(birthDay)}
                              ref={DOF}
                              onChange={DOFUpdater}
                              type="date"
                              id="dof"
                              required
                            ></input>
                            <label htmlFor="role">
                              Who are you? (eg : Student, Professor, Developer
                              etc...)
                            </label>
                            <input
                              value={role}
                              type="text"
                              ref={Role}
                              id="role"
                              placeholder="Who are you?"
                              contentEditable={true}
                            ></input>

                            <label htmlFor=""></label>
                            <TextField
                              value={bio}
                              id="standard-textarea"
                              sx={{ width: "100%", fontFamily: "Space Mono" }}
                              inputRef={BIO}
                              placeholder="Write Your Bio"
                              multiline
                              variant="standard"
                            />
                            <button type="submit">Update</button>
                          </form>
                        </div>
                      )} */}
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center mt-10 mb-10">
                    <h1 className="text-3xl font-bold">
                      {user.user_name === userDetails.user_name && "Public "}
                      Posts
                    </h1>
                    <div className="mt-5">
                      {publicPost.length === 0 ? (
                        <div>
                          <h1>
                            No Posts Yet{" "}
                            <span className="text-lg font-blue-400">
                              <Link to={"/createpost"}>Create One</Link>
                            </span>
                          </h1>
                        </div>
                      ) : (
                        publicPost.map((items) => {
                          return (
                            <div className="flex flex-row items-center border-b border-gray-400">
                              <div className="flex flex-row items-center justify-center pr-5 min-h-40 min-w-48 max-w-48 max-h-40">
                                <img
                                  className="object-scale-down w-full h-full"
                                  src={`http://localhost:5000/${items.post_images}`}
                                />
                              </div>
                              <div className="flex flex-col justify-center pl-5">
                                <Link to={`/Read Blog/${items.post_id}`}>
                                  <p className="text-xl font-semibold text-justify hover:underline">
                                    {items.post_title.length > 100
                                      ? items.post_title.substring(0, 100) +
                                        "..."
                                      : items.post_title}
                                  </p>
                                </Link>

                                <p className="text-justify">
                                  {items.post_summary.length > 250
                                    ? items.post_summary.substring(0, 250) +
                                      "..."
                                    : items.post_summary}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {user.user_name === userDetails.user_name && (
                    <div className="flex flex-col items-center justify-center mt-10 mb-10">
                      <h1 className="text-3xl font-bold">
                        Private Posts
                      </h1>
                      <div className="mt-5">
                        {privatePost.length === 0 ? (
                          <div>
                            <h1>
                              No Posts Yet{" "}
                              <span className="text-lg font-blue-400">
                                <Link to={"/createpost"}>Create One</Link>
                              </span>
                            </h1>
                          </div>
                        ) : (
                          privatePost.map((items) => {
                            return (
                              <div className="flex flex-row items-center border-b border-gray-400">
                                <div className="flex flex-row items-center justify-center pr-5 min-h-40 min-w-48 max-w-48 max-h-40">
                                  <img
                                    className="object-scale-down w-full h-full"
                                    src={`http://localhost:5000/${items.post_images}`}
                                  />
                                </div>
                                <div className="flex flex-col justify-center pl-5">
                                  <Link to={`/Read Blog/${items.post_id}`}>
                                    <p className="text-xl font-semibold text-justify hover:underline">
                                      {items.post_title.length > 100
                                        ? items.post_title.substring(0, 100) +
                                          "..."
                                        : items.post_title}
                                    </p>
                                  </Link>

                                  <p className="text-justify">
                                    {items.post_summary.length > 250
                                      ? items.post_summary.substring(0, 250) +
                                        "..."
                                      : items.post_summary}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ProfileCaller = () => {
  const { user_name } = useParams();
  return <Profile user_name={user_name} />;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  return <React.Fragment></React.Fragment>;
}
