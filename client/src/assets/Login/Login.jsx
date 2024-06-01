import { useContext, useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import "../SignUp/SignUp.css";
import axios from "../../../api/axios.jsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const Login_URL = "/login";
import { SnackBar } from "./Alert.jsx";
import { FaGoogle } from "react-icons/fa";

export const Login = () => {
  const { auth, setAuth, setUser } = useAuth();
  const [alert, setAlert] = useState(false);
  const Gmail = useRef(null);
  const Passcode = useRef(null);
  const [Snack, setSnack] = useState(null);
  // const [errMsg, seterrMsg] = useState('');

  const navigate = useNavigate();

  const GoogleRequesterRegister = async () => {
    // window.open("http://localhost:5000/auth/google/callback", "_self");
    window.open(
      "https://inkwellifyserver-git-main-vanamuthu-vs-projects.vercel.app/auth/google/callback",
      "_self"
    );
  };

  useEffect(() => {
    Gmail.current.focus();
  }, []);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: Gmail.current.value,
        passcode: Passcode.current.value,
      };
      const response = await axios.post(Login_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      const user_name = response?.data?.user_name;
      if (response?.data?.user_details[0].verified) {
        localStorage.setItem("accessToken", accessToken);
      }
      console.log(accessToken);
      console.log(response?.data?.user_details[0].verified);
      localStorage.setItem("user_id", response?.data?.user_details[0].user_id);
      // localStorage.setItem("user_id", response?.data?.user_details[0].user_id);
      setAuth({
        Gmail: Gmail.current.value,
        Passcode: Passcode.current.value,
        user_id: response?.data?.user_details[0].user_id,
        accessToken,
      });
      setUser({
        Gmail: Gmail.current.value,
        Passcode: Passcode.current.value,
        user_name: response?.data?.user_details[0].user_name,
        user_id: response?.data?.user_details[0].user_id,
        profileimage: response?.data?.user_details[0].profileimage,
        verified: response?.data?.user_details[0].verified,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setSnack(
        <SnackBar message={response?.data?.login_status} variant={"success"} />
      );
      setAlert(true);
    } catch (error) {
      console.log(error?.response?.data?.login_status);
      setSnack(
        <SnackBar
          message={error?.response?.data?.login_status}
          variant={"error"}
        />
      );
      setAlert(true);
    }
  };
  alert &&
    setTimeout(() => {
      setAlert(false);
      // console.log(Snack);
    }, 3000);

  return (
    <>
      {alert && Snack}
      <div className="w-2/4 max-md:w-10/12">
        <h1 className="mt-5 mb-5 text-xl font-semibold text-center text-orange-500 max-md:text-sm">
          Login Page
        </h1>
        {/* <p ref={errMsg} aria-live="assertive">
        {errMsg}
      </p> */}
        <form
          onSubmit={SubmitHandler}
          className="flex flex-col items-center justify-center w-full"
        >
          <label
            htmlFor="em"
            className="flex flex-row items-start justify-start w-full mt-5 mb-2 text-center max-md:text-vs"
          >
            Enter Your Email <span className="pl-1 text-red-700">*</span>
          </label>
          <input
            type="text"
            className="w-full mt-2 border-b-2 border-orange-500 em focus:outline-none max-md:text-xs"
            autoComplete="off"
            ref={Gmail}
            required
          ></input>
          <label
            htmlFor="em"
            className="flex flex-row items-start justify-start w-full mt-5 mb-2 text-center max-md:text-vs"
          >
            Enter Your Password <span className="pl-1 text-red-700">*</span>
          </label>
          <input
            className="w-full mt-2 border-b-2 border-orange-500 em focus:outline-none max-md:text-xs"
            type="password"
            ref={Passcode}
            required
          ></input>

          <div className="flex flex-row items-center justify-around w-full mt-5 mb-2 ">
            <Link to={"/SignUp/forgetusername"}>
              <p className="forget max-md:text-xs">forget username</p>
            </Link>
            <Link to={"/SignUp/forgetpasscode"}>
              <p className="forget max-md:text-xs">forget passcode</p>
            </Link>
          </div>
          <div className="mb-5">
            <Link to={"/SignUp"}>
              <p className="text-red-700 hover:underline hover:underline-offset-1 max-md:text-xs">
                New User ? Register
              </p>
            </Link>
          </div>
          <button
            className="pt-2 pb-2 pl-5 pr-5 bg-orange-500 rounded-xl text-gray-50 hover:border hover:border-orange-500 hover:bg-gray-50 hover:text-orange-500 max-md:text-xs max-md:pt-1.5 max-md:pb-1.5 max-md:pr-4 max-md:pl-4"
            type="Submit"
          >
            Login
          </button>
        </form>

        <hr className="h-0.5 mx-auto my-4 bg-gray-100 border-0 md:my-10 dark:bg-gray-300" />

        <div className="flex flex-row items-center w-full mb-10 justify-evenly max-md:flex-col">
          <button
            className="flex flex-row items-center justify-center w-full pt-2 pb-2 pr-10 mt-2 mb-2 text-lg bg-red-500 cursor-not-allowed text-gray-50"
            onClick={GoogleRequesterRegister}
            disabled={true}
          >
            <FaGoogle size={"20px"} />
            Google
          </button>
        </div>
      </div>
    </>
  );
};

export const ForgetUsername = () => {
  const [visiblemodel, setVisibleModel] = useState(false);
  const Gmail = useRef(null);

  const SubmitHandler = (event) => {
    event.preventDefault();
    // console.log(Gmail.current.value);
    setVisibleModel((prev) => !prev);
  };

  return (
    <div className="Login">
      <h1>Finding Your User Name</h1>
      <form className="Gmail-form" onSubmit={(event) => SubmitHandler(event)}>
        <input
          type="email"
          ref={Gmail}
          placeholder="Enter Your Gmail"
          className="input"
        ></input>
        <button type="Submit" className="Submit">
          Find
        </button>
      </form>
      {visiblemodel && (
        <Link to={"/SignUp/login"}>
          <p className="Return">Return To Login Page</p>
        </Link>
      )}
    </div>
  );
};

export const ForgetPasscode = () => {
  const [visible, setVisible] = useState(false);
  const [visiblereset, setVisibleReset] = useState(false);
  const [visiblemodel, setVisibleModel] = useState(false);

  const Gmail = useRef(null);
  const OTP = useRef(null);
  const Passcode = useRef(null);
  const ConfirmPasscode = useRef(null);

  const SubmitHandler1 = (event) => {
    event.preventDefault();
  };

  const SubmitHandler2 = (event) => {
    event.preventDefault();
  };

  const SubmitHandler3 = (event) => {
    event.preventDefault();
  };

  const Caller = () => {
    setVisible((prev) => !prev);
  };

  const CallerReset = () => {
    setVisibleReset((prev) => !prev);
  };

  const CallerChange = () => {
    setVisibleModel((prev) => !prev);
  };

  return (
    <div className="Login">
      <h1>Reseting Your Passcode</h1>
      <form
        className="FinalForm"
        onSubmit={(event) => {
          SubmitHandler1(event);
        }}
      >
        <input
          placeholder="Enter Your Gmail"
          name="SendMeCode"
          className="input"
          form="CodeSender"
          type="eamil"
          ref={Gmail}
        ></input>
        <button onClick={Caller} type="Submit" className="Submit">
          Send
        </button>
      </form>

      {visible && (
        <form
          onSubmit={(event) => {
            SubmitHandler2(event);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="CodeSender"
        >
          <input
            placeholder="Enter Your OTP You Recieved(Mail) "
            className="input"
            form="FinalForm"
            ref={OTP}
          ></input>
          <button onClick={CallerReset} type="Submit" className="Submit">
            Verify
          </button>
        </form>
      )}

      {visiblereset && (
        <>
          <form
            className="ResetForm"
            onSubmit={(event) => {
              SubmitHandler3(event);
            }}
          >
            <input
              placeholder="Enter Your New Passcode"
              name="newpasscode"
              className="input"
              form="ResetForm"
              ref={Passcode}
            ></input>
            <input
              placeholder="Confirm Your Passcode"
              name="repassword"
              className="input"
              form="ResetForm"
              ref={ConfirmPasscode}
            ></input>
            <button onClick={CallerChange} type="Submit" className="Submit">
              Change
            </button>
          </form>
          {visiblemodel && (
            <Link to={"/SignUp/login"}>
              <p className="Return">Return To Login Page</p>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export const GetUsers = () => {
  const { auth } = useAuth();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

  const ClickHandler = async () => {
    // console.log(auth.accessToken);
    try {
      const response = await axios.post("/users", config);
      // console.log(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={ClickHandler}>GetUsers</button>
    </>
  );
};
