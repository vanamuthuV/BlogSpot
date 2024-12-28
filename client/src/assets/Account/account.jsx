import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbarContext } from "../../context/snackProvider";

const USERNAME = "/account/username";
const EMAIL = "/account/email";
const PASSWORD = "/account/verify/oldpass";
const PASSWORDUPDATE = "/account/password";
const DELETEACCOUNT = "/account/account";

export const Accounts = () => {
  const { user, setUser, setAuth } = useAuth();

  const navigate = useNavigate();

  const { showSnackbar } = useSnackbarContext();

  const username = useRef("");
  const email = useRef("");
  const oldPassword = useRef("");
  const newPassword = useRef("");


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


  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const DeleteAccount = async () => {
    try {
      const response = await axios.delete(DELETEACCOUNT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response?.data?.success) {
        showSnackbar(response?.data?.message, response?.data?.success);
        setUser({});
        setAuth({});
        localStorage.clear();
        navigate("/");
      } else {
        showSnackbar(response?.data?.message, false);
      }
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, false);
    }

    setOpenDelete(false);
  };

  const OldPasswordHandle = async (ev) => {
    ev.preventDefault();

    const Credentials = {
      user_passcode: oldPassword.current.value,
    };

    try {
      const response = await axios.post(PASSWORD, Credentials, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response?.data?.success) {
        setIsPass(true);
        setShowOldPassword(false);
        showSnackbar(response?.data?.message, response?.data?.success);
      } else {
        showSnackbar("Wrong password", false);
      }
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, false);
    }
  };



  const [emails, setEmails] = useState([]);
  let cachedFirstEmailLetter = ""; // To track the first letter already fetched

  console.log(emails);

  const EmailChecker = async () => {
    const emailValue = email.current.value.trim();

    if (emailValue.length === 1) {
      // Send a request only when the length is exactly 1 and a new first letter is typed
      if (cachedFirstEmailLetter !== emailValue) {
        cachedFirstEmailLetter = emailValue;

        try {
          const response = await axios.get(`${EMAIL}/${emailValue}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          setEmails(response?.data?.data);
          const isMatch = response?.data?.data?.some(
            (user) => user?.user_email === emailValue
          );

          if (isMatch) {
            // If an exact match is found (username already exists in the array), set 'P' to false and 'N' to true
            setemailDialogueSetterP(false);
            setemailDialogueSetterN(true);
          } else {
            // If no exact match is found (username is available), set 'P' to true and 'N' to false
            setemailDialogueSetterP(true);
            setemailDialogueSetterN(false);
          }
          return;
        } catch (error) {
          console.log(error);
          return;
        }
      }
    } else if (emailValue.length > 1) {
      // Filter the cached usernames for further checks
      const isMatch = emails.some((user) => user?.user_email === emailValue);

      if (isMatch) {
        // If an exact match is found (username already exists in the array), set 'P' to false and 'N' to true
        setemailDialogueSetterP(false);
        setemailDialogueSetterN(true);
      } else {
        // If no exact match is found (username is available), set 'P' to true and 'N' to false
        setemailDialogueSetterP(true);
        setemailDialogueSetterN(false);
      }
      return;
    } else if (emailValue.length === 0) {
      // Reset if the user clears the input
      cachedFirstEmailLetter = "";
      setEmails([]);
      setemailDialogueSetterN(false);
      setemailDialogueSetterP(false);
      return;
    }
  };

  const [names, setNames] = useState([]);
  let cachedFirstLetter = ""; // To track the first letter already fetched

  const UserNameChecker = async () => {
    const usernameValue = username.current.value.trim();

    // Check for empty spaces or special characters
    if (!/^[a-zA-Z0-9]*$/.test(usernameValue)) {
      return;
    }

    if (usernameValue.length === 1) {
      // Send a request only when the length is exactly 1 and a new first letter is typed
      if (cachedFirstLetter !== usernameValue) {
        cachedFirstLetter = usernameValue;

        try {
          const response = await axios.get(`${USERNAME}/${usernameValue}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          setNames(response?.data?.data);
          const isMatch = response?.data?.data?.some(
            (user) => user?.user_name === usernameValue
          );

          if (isMatch) {
            // If an exact match is found (username already exists in the array), set 'P' to false and 'N' to true
            setUserNameDialogueSetterP(false);
            setUserNameDialogueSetterN(true);
          } else {
            // If no exact match is found (username is available), set 'P' to true and 'N' to false
            setUserNameDialogueSetterP(true);
            setUserNameDialogueSetterN(false);
          }
          return;
        } catch (error) {
          console.log(error);
          return;
        }
      }
    } else if (usernameValue.length > 1) {
      // Filter the cached usernames for further checks
      const isMatch = names.some((user) => user?.user_name === usernameValue);

      if (isMatch) {
        // If an exact match is found (username already exists in the array), set 'P' to false and 'N' to true
        setUserNameDialogueSetterP(false);
        setUserNameDialogueSetterN(true);
      } else {
        // If no exact match is found (username is available), set 'P' to true and 'N' to false
        setUserNameDialogueSetterP(true);
        setUserNameDialogueSetterN(false);
      }
      return;
    } else if (usernameValue.length === 0) {
      // Reset if the user clears the input
      cachedFirstLetter = "";
      setNames([]);
      setUserNameDialogueSetterN(false);
      setUserNameDialogueSetterP(false);
      return;
    }
  };

  const EmailUpdation = async () => {
    if (Object.keys(user).length === 0) return navigate("/SignUp");

    const details = {
      user_email: email.current.value.trim(),
      user_id : user.user_id
    };

    if (emailDialogueSetterP) {
      try {
        const response = await axios.patch(EMAIL, details, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response?.data?.success) {
          setUser((prev) => ({
            ...prev,
            user_email: email.current?.value.trim(),
            verified: false,
          }));
        }
        localStorage.setItem("accessToken", response?.data?.data);
        setemailEdit(false);
        setemailDialogueSetterN(false);
        setemailDialogueSetterP(false);
        showSnackbar(response?.data?.message, response?.data?.success);
      } catch (error) {
        console.log(error);
        showSnackbar(error?.response?.data?.message, false);
      }
    }
  };

  const UserNameUpdation = async () => {
    if (Object.keys(user).length === 0) return navigate("/SignUp");

    const details = {
      user_name: username.current?.value.trim(),
    };

    if (usernameDialogueSetterP) {
      try {
        const response = await axios.patch(USERNAME, details, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response?.data?.success) {
          setUser((prev) => ({
            ...prev,
            user_name: username.current?.value.trim(),
          }));

          localStorage.setItem("accessToken", response?.data?.data);
          setUsernameEdit(false);
          setUserNameDialogueSetterN(false);
          setUserNameDialogueSetterP(false);
          showSnackbar(response?.data?.message, response?.data?.success);
        }
      } catch (error) {
        console.log(error);
        showSnackbar(error?.response?.data?.message, false);
      }
    }
  };

  const PasswordUpdation = async (ev) => {
    ev.preventDefault();
    console.log(newPassword.current.value);

    const Credential = {
      new_password: newPassword.current.value,
    };

    try {
      const response = await axios.patch(PASSWORDUPDATE, Credential, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response?.data?.success) {
        setIsPass(false);
        showSnackbar(response?.data?.message, response?.data?.success);
        setUser({});
        setAuth({});
        localStorage.clear();
        navigate("/SignUp/login");
      } else {
        showSnackbar(response?.data?.message, false);
      }
    } catch (error) {
      console.log(error);
      showSnackbar(error?.response?.data?.message, false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center mb-16">
      <div className="flex flex-col items-center justify-center w-10/12">
       

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
