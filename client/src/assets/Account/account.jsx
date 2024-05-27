import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import { Link, useSearchParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ACCOUNT = "/account";
const USERNAMECHECK = "/usernamecheck";
const EMAILCHECK = "/emailcheck";
const USERNAMEUPDATE = "/usernameupdate";
const EMAILUPDATE = "/emailupdate";
const PASSWORDVERIFY = "/passcodeverify";
const PASSWORDUPDATE = "passwordupdate";
const DELETEACCOUNT = "/deleteaccount";

export const Accounts = () => {
  const { user, setUser, setAuth } = useAuth();

  const navigate = useNavigate();

  console.log(user);

  const username = useRef("");
  const email = useRef("");
  const oldPassword = useRef("");
  const newPassword = useRef("");

  const [messageP, setMessageP] = useState(null);
  const [messageN, setMessageN] = useState(null);

  const data = {
    user_id: user.user_id,
  };

  const [usernameEdit, setUsernameEdit] = useState(false);
  const [emailEdit, setemailEdit] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [isPass, setIsPass] = useState(false);

  const UserNameEditor = () => {
    setUsernameEdit((prev) => !prev);
    username.current.focus;
  };

  const EmailEditor = () => {
    setemailEdit((prev) => !prev);
  };

  const OldPassword = () => {
    setShowOldPassword((prev) => !prev);
  };

  const [usernameDialogueSetterP, setUserNameDialogueSetterP] = useState(false);
  const [usernameDialogueSetterN, setUserNameDialogueSetterN] = useState(false);

  const [emailDialogueSetterP, setemailDialogueSetterP] = useState(false);
  const [emailDialogueSetterN, setemailDialogueSetterN] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [openN, setOpenN] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseN = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenN(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const DeleteAccount = async () => {
    try {
      const response = await axios.delete(DELETEACCOUNT + `/${user.user_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data?.data);

      if (response?.data?.data === true) {
        setMessageP("Account Deletion Complete. Redirecting Please wait...");
        setTimeout(() => {
          setUser({});
          setAuth({});
          localStorage.clear();
          navigate("/");
        }, 4000);
      } else {
        setMessageN("Cannot Delete Account!!");
      }
    } catch (error) {
      console.log(error);
    }

    setOpenDelete(false);
  };

  const OldPasswordHandle = async (ev) => {
    ev.preventDefault();
    console.log(oldPassword.current.value);

    const Credentials = {
      user_passcode: oldPassword.current.value,
      user_id: user.user_id,
    };

    try {
      const response = await axios.post(PASSWORDVERIFY, Credentials, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data?.data);
      if (response?.data?.data === true) {
        setIsPass(true);
        setShowOldPassword(false);
        setMessageP("Password Verification Success!!");
      } else {
        setMessageN("Password Doesn't Match!!");
        setOpenN(true);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (messageP) {
      setOpen(true);
      setOpenN(false);
    }
  }, [messageP]);

  useEffect(() => {
    if (messageN) {
      setOpenN(true);
      setOpen(false);
    }
  }, []);

  const EmailChecker = async () => {
    if (email.current.value === "") {
      setemailDialogueSetterN(false);
      setemailDialogueSetterP(false);
      return;
    }

    const userdata = {
      user_email: email.current.value,
    };

    try {
      const response = await axios.post(EMAILCHECK, userdata, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data?.data);

      if (response?.data?.data === true) {
        setemailDialogueSetterP(true);
        setemailDialogueSetterN(false);
      } else {
        console.log("Hola");
        setemailDialogueSetterP(false);
        setemailDialogueSetterN(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UserNameChecker = async () => {
    console.log(username.current.value);

    if (username.current.value === "") {
      setUserNameDialogueSetterN(false);
      setUserNameDialogueSetterP(false);
      return;
    }

    const userdata = {
      user_name: username.current.value,
    };

    try {
      const response = await axios.post(USERNAMECHECK, userdata, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data?.data);

      if (response?.data?.data === true) {
        setUserNameDialogueSetterP(true);
        setUserNameDialogueSetterN(false);
      } else {
        console.log("Hola");
        setUserNameDialogueSetterP(false);
        setUserNameDialogueSetterN(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const EmailUpdation = async () => {
    if (Object.keys(user).length === 0) return navigate("/SignUp");

    const details = {
      user_email: email.current.value,
      user_id: user.user_id,
    };

    if (emailDialogueSetterP) {
      try {
        const response = await axios.put(EMAILUPDATE, details, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
        console.log(user);
        setUser(response?.data?.data);
        setemailEdit(false);
        setemailDialogueSetterN(false);
        setemailDialogueSetterP(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const UserNameUpdation = async () => {
    if (Object.keys(user).length === 0) return navigate("/SignUp");

    const details = {
      user_name: username.current.value,
      user_id: user.user_id,
    };

    if (usernameDialogueSetterP) {
      try {
        const response = await axios.put(USERNAMEUPDATE, details, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
        console.log(user);
        setUser(response?.data?.data);
        setUsernameEdit(false);
        setUserNameDialogueSetterN(false);
        setUserNameDialogueSetterP(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(ACCOUNT, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const PasswordUpdation = async (ev) => {
    ev.preventDefault();
    console.log(newPassword.current.value);

    const Credential = {
      user_id: user.user_id,
      new_password: newPassword.current.value,
    };

    try {
      const response = await axios.put(PASSWORDUPDATE, Credential, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data?.data);
      if (response?.data?.data) {
        setMessageP("Password Changed Successfully!!");
        setIsPass(false);

        setTimeout(() => {
          setUser({});
          setAuth({});
          localStorage.clear();
          navigate("/SignUp");
        }, 4000);
      } else {
        setMessageN("Password Change Request Unsuccess!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center mb-16">
      <div className="flex flex-col items-center justify-center w-10/12">
        {/* <div className="flex flex-col items-end justify-center w-full">
          <div className="flex flex-col items-start justify-center">
            <div className="flex flex-row items-center justify-end mt-10">
              <img
                className="mr-3 rounded-full min-h-10 min-w-10 max-h-10 max-w-10"
                src={
                  user.profileimage
                    ? `http://localhost:5000/${user.profileimage}`
                    : "../../../public/Profile.jpeg"
                }
              />
              <Link className="hover:underline" to={`/${user.user_name}`}>
                {user.user_name}
              </Link>
            </div>
            <p>{user.user_email || user.Gmail}</p>
          </div>
        </div> */}
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {messageP}
          </Alert>
        </Snackbar>

        <Snackbar open={openN} autoHideDuration={5000} onClose={handleCloseN}>
          <Alert
            onClose={handleCloseN}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {messageN}
          </Alert>
        </Snackbar>

        <h1 className="w-full mt-10 text-4xl text-orange-500 align-start">
          Accounts
        </h1>
        <div className="flex flex-col items-start justify-center w-11/12">
          <div className="flex flex-col items-start w-full mt-10">
            <h1 className="w-full pb-2 text-2xl font-bold border border-white border-b-gray-500">
              Change username{" "}
            </h1>
            <p className="pt-2 pb-3 text-base">
              Changing your username can have{" "}
              <span className="text-red-500">unintended side effects</span>.
            </p>
            <button
              onClick={UserNameEditor}
              className="pt-1 pb-1 pl-2 pr-2 text-sm border-2 border-gray-700 rounded-lg"
            >
              Change Username
            </button>
            {usernameEdit && (
              <div className="flex flex-col w-full mt-5">
                <p className="flex flex-row items-center justify-start">
                  {" "}
                  Enter Your New User Name{" "}
                  <Tooltip
                    title="Remember username should not contain Whitespaces and Capital letters"
                    placement="right-start"
                  >
                    <button className="flex flex-row items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8 pl-2 "
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                        />
                      </svg>
                    </button>
                  </Tooltip>
                </p>
                <div className="flex flex-col w-full pt-2">
                  <div className="flex flex-row w-full">
                    <input
                      ref={username}
                      onChange={UserNameChecker}
                      pattern="^[a-z0-9]+$"
                      title="This field is won't Allow WhiteSpaces, Capital Letters and required"
                      className="w-full pt-1 pb-1 pl-5 mr-10 border-2 border-gray-700 rounded-full focus:outline-none"
                    />
                    <button
                      onClick={UserNameUpdation}
                      className="pt-1 pb-1 pl-2 pr-2 text-white bg-gray-700 rounded-lg"
                      disabled={usernameDialogueSetterN}
                      style={{
                        cursor: usernameDialogueSetterN && "not-allowed",
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
                {usernameDialogueSetterP && (
                  <Alert severity="success">User Name is available.</Alert>
                )}
                {usernameDialogueSetterN && (
                  <Alert severity="error">User Name is already taken.</Alert>
                )}
              </div>
            )}
          </div>
          {user.platform !== "google" && (
            <>
              <div className="flex flex-col items-start w-full mt-10">
                <h1 className="w-full pb-2 text-2xl font-bold border border-white border-b-gray-500">
                  Change E-mail{" "}
                </h1>
                <p className="pt-2 pb-3 text-base">
                  Changing your Email can have{" "}
                  <span className="text-red-500">unintended side effects</span>.
                </p>
                <button
                  onClick={EmailEditor}
                  className="pt-1 pb-1 pl-2 pr-2 text-sm border-2 border-gray-700 rounded-lg"
                >
                  Change Email
                </button>
                {emailEdit && (
                  <div className="flex flex-col w-full mt-5">
                    <p className="flex flex-row items-center justify-start">
                      {" "}
                      Enter Your New Email{" "}
                      <Tooltip
                        title="Remember username should not contain Whitespaces and Capital letters"
                        placement="right-start"
                      >
                        <button className="flex flex-row items-center text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-8 h-8 pl-2 "
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            />
                          </svg>
                        </button>
                      </Tooltip>
                    </p>
                    <div className="flex flex-col w-full pt-2">
                      <div className="flex flex-row w-full">
                        <input
                          ref={email}
                          onChange={EmailChecker}
                          pattern="^[a-z0-9]+(?:[._][a-z0-9]+)*@[a-z]+\.[a-z]+$"
                          title="This field won't allow whitespaces and required"
                          className="w-full pt-1 pb-1 pl-5 mr-10 border-2 border-gray-700 rounded-full focus:outline-none"
                        />
                        <button
                          onClick={EmailUpdation}
                          className="pt-1 pb-1 pl-2 pr-2 text-white bg-gray-700 rounded-lg"
                          disabled={emailDialogueSetterN}
                          style={{
                            cursor: emailDialogueSetterN && "not-allowed",
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                    {emailDialogueSetterP && (
                      <Alert severity="success">Email is available.</Alert>
                    )}
                    {emailDialogueSetterN && (
                      <Alert severity="error">Email is already taken.</Alert>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start w-full mt-10">
                <h1 className="w-full pb-2 text-2xl font-bold border border-white border-b-gray-500">
                  Change Password
                </h1>

                <p className="pt-2 pb-3 text-base">
                  Changing your Password can have{" "}
                  <span className="text-red-500">unintended side effects</span>.
                </p>
                <button
                  onClick={OldPassword}
                  className="pt-1 pb-1 pl-2 pr-2 text-sm border-2 border-gray-700 rounded-lg"
                >
                  Change Password
                </button>
                {showOldPassword && (
                  <div className="flex flex-row items-center justify-center w-full">
                    <div className="flex flex-col justify-center w-4/6 mt-5 items-s">
                      <label>Enter Your Current Password</label>
                      <form
                        onSubmit={OldPasswordHandle}
                        className="flex flex-col items-center justify-center w-full"
                      >
                        <input
                          type="password"
                          ref={oldPassword}
                          title="This field won't allow whitespaces and required"
                          className="w-full pt-1 pb-1 pl-5 mt-3 border-2 border-gray-700 rounded-full focus:outline-none"
                        />
                        <button className="pt-1 pb-1 pl-2 pr-2 mt-5 text-sm border-2 border-gray-700 rounded-lg">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {isPass && (
                  <div className="flex flex-row items-center justify-center w-full">
                    <div className="flex flex-col justify-center w-4/6 mt-5 items-s">
                      <label>
                        Enter Your <span className="text-red-500">New</span>{" "}
                        Password
                      </label>
                      <form
                        onSubmit={PasswordUpdation}
                        className="flex flex-col items-center justify-center w-full"
                      >
                        <input
                          type="password"
                          ref={newPassword}
                          title="This field won't allow whitespaces and required"
                          className="w-full pt-1 pb-1 pl-5 mt-3 border-2 border-gray-700 rounded-full focus:outline-none"
                        />
                        <button className="pt-1 pb-1 pl-2 pr-2 mt-5 text-sm border-2 border-gray-700 rounded-lg">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex flex-col items-start w-full mt-10">
            <h1 className="w-full pb-2 text-2xl font-bold text-red-500 border border-white border-b-gray-500">
              Delete account
            </h1>
            <p className="pt-2 pb-3 text-base">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              onClick={handleClickOpenDelete}
              className="pt-2 pb-2 pl-4 pr-4 text-sm font-bold text-white bg-red-500 border border-red-500 rounded-lg hover:bg-white hover:text-red-500"
            >
              Delete your account
            </button>
          </div>
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are You Sure To Delete Your Account ?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <span className="text-red-500">WARNING</span>:<br></br> Before
                proceeding with the deletion of your blog account, please be
                aware that this action is irreversible and will result in the
                permanent loss of all associated data, including posts,
                comments, and account settings. Once deleted, you will not be
                able to recover any of this information.If you still wish to
                proceed, please reply to this message with confirmation, and our
                team will initiate the deletion process accordingly.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button className="pl-1 pr-2" onClick={handleCloseDelete}>
                Cancel
              </button>
              <button
                className="pl-1 pr-1 text-red-500"
                onClick={DeleteAccount}
              >
                Delete
              </button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
