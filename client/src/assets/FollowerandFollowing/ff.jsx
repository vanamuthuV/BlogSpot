import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "../../../api/axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ImageComponent from "../../../utils/ImageComponent";
import { CircularProgress } from "@mui/material";

import img from "../../../public/Profile.jpeg";

const GETFOLLOWERS = "/getfollowers";
const GETFOLLOWINGS = "/getfollowings";
const REMOVE = "/removeuser";
const UNFOLLOW = "/unfollowuser";

export const FollowersAndFollowingLayout = () => {
  const { user_name } = useParams();
  const [color, setColor] = useState(true);
  // console.log(user_name);

  const colored =
    "flex flex-row items-center justify-center  pt-1 pb-1 pr-4 pl-4 text-md text-white bg-orange-500 border-none rounded-full max-md:text-xs";

  const notcolored =
    "flex flex-row items-center justify-center pt-1 pb-1 pl-4 pr-4 text-md bg-gray-50 rounded-full max-md:text-xs border border-orange-500 text-orange-500";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center w-3/4 mt-5">
        <Link
          className="flex flex-row items-center justify-center w-3/4"
          to={`/${user_name}/followers`}
        >
          <button className={color ? colored : notcolored} onClick={() => setColor(true)}>
            Followers
          </button>
        </Link>

        <Link
          className="flex flex-row items-center justify-center w-3/4"
          to={`/${user_name}/followings`}
        >
          <button className={color ? notcolored : colored} onClick={() => setColor(false)}>
            Followings
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export const Followers = () => {
  const { user_name } = useParams();

  const [follower, setFollower] = useState([]);
  const [loading, setLoading] = useState(true)
  const { user } = useAuth();
  const Use = user;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [users, setUser] = useState("");

  const handleClickOpen = (ev) => {
    // console.log(ev.target.value);
    const value = ev.target.value;
    const Data = value.split("/../");
    // console.log(Data[0]);
    // console.log(Data[1]);
    setUser(Data[1]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = async () => {
    const Data = follower.filter((i) => i.user_name === users);
    const { follow_id } = Data[0];

    try {
      setLoading(true)
      const response = await axios.delete(
        REMOVE + `/${follow_id}..${user_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Adjust the content type as needed
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        }
      );
      setFollower(response?.data?.data);
      setLoading(false)
      // console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await axios.post(GETFOLLOWERS, {
          data: {
            user_name: user_name,
          },
        });
        // console.log(response?.data?.data);
        setFollower(response?.data?.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="w-2/4 max-md:w-3/4">
      {loading ? (
        <div className="flex flex-row items-center justify-center w-full h-[calc(100vh-144px)]">
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
        <div className="flex flex-col items-center justify-start w-full">
          <Link to={`/${user_name}`}>
            <h1 className="pt-5 pb-5 text-xl max-md:text-sm">
              <span className="font-bold">{user_name}</span>'s Followers
            </h1>
          </Link>

          {follower.length === 0 ? (
            <div>
              <h1 className="m-5 text-red-500">No Followers</h1>
            </div>
          ) : (
            follower.map((user, index) => {
              return (
                <div className="flex flex-row items-center justify-between w-full mt-2 mb-2 max-md:mt-1 max-md:mb-1">
                  <div className="flex flex-row items-center justify-center">
                    <div className="max-w-24 min-w-24 max-h-24 min-h-24 max-md:max-w-16 max-md:min-w-16 max-md:min-h-16 max-md:max-h-16">
                      {/* <img
                      className="rounded-full max-w-24 min-w-24 max-h-24 min-h-24 max-md:max-w-16 max-md:min-w-16 max-md:min-h-16 max-md:max-h-16"
                      src={
                        user.profileimage
                          ? `http://localhost:5000/${user.profileimage}`
                          : `../../../public/Profile.jpeg`
                      }
                    /> */}
                      {user.profileimage === null ? (
                        <img
                          className="rounded-full max-w-24 min-w-24 max-h-24 min-h-24 max-md:max-w-16 max-md:min-w-16 max-md:min-h-16 max-md:max-h-16"
                          src={`../../../public/Profile.jpeg`}
                        />
                      ) : (
                        <ImageComponent
                          features={
                            "rounded-full max-w-24 min-w-24 max-h-24 min-h-24 max-md:max-w-16 max-md:min-w-16 max-md:min-h-16 max-md:max-h-16"
                          }
                          base64String={user.profileimage}
                        />
                      )}
                    </div>
                    <Link to={`/${user.user_name}`}>
                      <div className="flex flex-col justify-center ml-5">
                        <p className="max-md:text-base">{user.userfullname}</p>
                        <Link to={`/${user.user_name}`}>
                          <p className="hover:underline max-md:text-sm">
                            {user.user_name}
                          </p>
                        </Link>
                      </div>
                    </Link>
                  </div>

                  {Use.user_name === user_name && (
                    <>
                      <button
                        className="pt-1 pb-1 pl-5 pr-5 text-red-500 border-2 border-red-500 rounded-lg max-md:pl-2 max-md:pr-2 max-md:text-xs"
                        value={`${user.follow_id}/../${user.user_name}`}
                        onClick={handleClickOpen}
                      >
                        Remove
                      </button>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <p className="m-5 text-red-500">Remove Alert!!</p>
                        <DialogContent>
                          <p className="text-md">
                            Are You Sure To Remove{" "}
                            <span className="text-red-500 underline">
                              {users}
                            </span>{" "}
                            From Following You ?
                          </p>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            sx={{ fontFamily: "Space Mono" }}
                            autoFocus
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                          <button
                            style={{ fontFamily: "Space Mono" }}
                            className="text-red-500"
                            onClick={handleRemove}
                            key={index}
                          >
                            Remove
                          </button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export const Followings = () => {
  const { user_name } = useParams();

  const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const Use = user;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [users, setUser] = useState("");

  const handleClickOpen = (ev) => {
    // console.log(ev.target.value);
    const value = ev.target.value;
    const Data = value.split("/../");
    // console.log(Data[0]);
    // console.log(Data[1]);
    setUser(Data[1]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = async () => {
    const Data = following.filter((i) => i.user_name === users);
    const { follow_id } = Data[0];

    try {
      setLoading(true)
      const response = await axios.delete(
        UNFOLLOW + `/${follow_id}..${user_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Adjust the content type as needed
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include any authentication tokens or other headers
          },
        }
      );
      setFollowing(response?.data?.data);
      setLoading(false)
      // console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await axios.post(GETFOLLOWINGS, {
          data: {
            user_name: user_name,
          },
        });
        // console.log(response?.data?.data);
        setFollowing(response?.data?.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="w-2/4 max-md:w-3/4">
      {loading ? (
        <div className="flex flex-row items-center justify-center w-full h-[calc(100vh-144px)]">
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
        <div className="flex flex-col items-center justify-start w-full">
          <h1 className="pt-5 pb-5 text-xl max-md:text-sm">
            <span className="font-bold">{user_name}</span>'s Followings
          </h1>
          {following.length === 0 ? (
            <div>
              <h1>No Followings</h1>
            </div>
          ) : (
            following.map((user) => {
              return (
                <div className="flex flex-row items-center justify-between w-full mt-2 mb-2 max-md:mt-1 max-md:mb-1 ">
                  <div className="flex flex-row items-center justify-center">
                    <div className="max-w-24 min-w-24 max-h-24 min-h-24 max-md:max-w-16 max-md:min-w-16 max-md:min-h-16 max-md:max-h-16">
                      {/* 
                     <img
                      className="rounded-full max-w-24 min-w-24 max-h-24 min-h-24 max-md:max-w-16 max-md:min-w-16 max-md:min-h-16 max-md:max-h-16"
                      src={
                        user.profileimage === null
                          ? `../../../public/Profile.jpeg`
                          : `http://localhost:5000/${user.profileimage}`
                      }
                    /> */}

                      {user.profileimage === null ? (
                        <img
                          className="rounded-full max-w-24 min-w-24 max-h-24 min-h-24 max-md:max-w-16 max-md:min-w-16 max-md:min-h-16 max-md:max-h-16"
                          src={`../../../public/Profile.jpeg`}
                        />
                      ) : (
                        <ImageComponent
                          features={
                            "rounded-full max-w-24 min-w-24 max-h-24 min-h-24 max-md:max-w-16 max-md:min-w-16 max-md:min-h-16 max-md:max-h-16"
                          }
                          base64String={user.profileimage}
                        />
                      )}
                    </div>
                    <Link to={`/${user.user_name}`}>
                      <div className="flex flex-col justify-center ml-5">
                        <p className="max-md:text-base">{user.userfullname}</p>
                        <Link to={`/${user.user_name}`}>
                          <p className="hover:underline max-md:text-sm">
                            {user.user_name}
                          </p>
                        </Link>
                      </div>
                    </Link>
                  </div>

                  {Use.user_name === user_name && (
                    <>
                      <button
                        className="pt-1 pb-1 pl-5 pr-5 text-red-500 border-2 border-red-500 rounded-lg max-md:pl-2 max-md:pr-2 max-md:text-xs"
                        value={`${user.follow_id}/../${user.user_name}`}
                        onClick={handleClickOpen}
                      >
                        Unfollow
                      </button>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle
                          sx={{ fontFamily: "Space Mono" }}
                          id="responsive-dialog-title"
                        >
                          {"Unfollow Alert!!"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText sx={{ fontFamily: "Space Mono" }}>
                            Are You Sure To Unfollow{" "}
                            <span className="text-red-500 underline">
                              {users}
                            </span>{" "}
                            ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            sx={{ fontFamily: "Space Mono" }}
                            autoFocus
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                          <button
                            style={{ fontFamily: "Space Mono" }}
                            className="text-red-500"
                            onClick={handleRemove}
                          >
                            Unfollow
                          </button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
