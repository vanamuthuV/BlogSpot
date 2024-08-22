import { useContext, useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import "../SignUp/SignUp.css";
import axios from "../../../api/axios.jsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
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
      console.log(response?.data?.accessToken);
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
      <div className="w-2/4 max-md:w-11/12">
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

          {/* <div className="flex flex-row items-center justify-around w-full mt-5 mb-2 ">
            <Link to={"/SignUp/forgetusername"}>
              <p className="forget max-md:text-xs">forget username</p>
            </Link>
            <Link to={"/SignUp/forgetpasscode"}>
              <p className="forget max-md:text-xs">forget passcode</p>
            </Link>
          </div> */}
          <div className="flex flex-row items-center justify-between w-full mt-5 mb-5">
            <Link to={"/forgetpassword"}>
              <p className="text-blue-500 max-md:text-xs">forget password</p>
            </Link>
            <Link to={"/SignUp"}>
              <p className="text-blue-500 max-md:text-xs">
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
            className="flex flex-row items-center justify-center w-full pt-2 pb-2 pr-10 mt-2 mb-2 text-lg bg-red-500 text-gray-50"
            onClick={GoogleRequesterRegister}
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

  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [gmail, setGmail] = useState("");
  const [snackOn, setSnackOn] = useState(false);
  const [SnackValue, setSnackValue] = useState({
    message: "",
    variant: "",
  });

  const PASSWORDUPDATE = "/passwordupdate/bygmail";

  const navigate = useNavigate();

  const Gmail = useRef("");
  const OTP = useRef("");
  const Passcode = useRef("");
  const ConfirmPasscode = useRef("");

  const [otp, setOTP] = useState("");

  const DispatchOTP = async () => {
    if (Gmail.current.value) {
      const data = {
        email: Gmail.current.value,
      };
      setGmail(Gmail.current.value);
      try {
        setLoader(true);
        // console.log(data);
        const response = await axios.post("/emailverify/reset", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response?.data);

        setSnackValue({
          message: response?.data?.message,
          variant: response?.data?.variant,
        });
        setSnackOn(true);
        if (response?.data?.danger == 100) {
          setTimeout(() => {
            navigate("/SignUp");
          }, 3000);
        }
        if (response?.data?.danger === 200) {
          setTimeout(() => {
            navigate("/forgetpassword");
          }, 3000);
        }
        setOTP(response?.data?.OTPs);
        setCount((prev) => prev + 1);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSnackValue({
        message: 'Please Enter The Gmail',
        variant : "error"
      })
      setSnackOn(true)
    }
    
  };

  const Verify = () => {
    setLoader(true);
    if (OTP.current.value) {
      console.log(
        "Type of server",
        typeof otp,
        "Type Of Enter",
        typeof OTP.current.value
      );
      if (Number(OTP.current.value) === otp) {
        setSnackValue({
          message: "OTP Validation Success",
          variant: "success",
        });
        setSnackOn(true);
        setCount((prev) => prev + 1);
      } else {
        setSnackValue({
          message: "OTP Incorrect",
          variant: "error",
        });
        setSnackOn(true);
      }
    } else {
      setSnackValue({
        message: "Please Enter the OTP",
        variant: "error",
      });
      setSnackOn(true);
    }
    setLoader(false);
  };

  const UpdatePassword = () => {
    console.log("Hola");
    if (Passcode.current.value && ConfirmPasscode.current.value) {
      if (Passcode.current.value === ConfirmPasscode.current.value) {
        (async () => {
          const response = await axios.put(PASSWORDUPDATE, {
            user_email: gmail,
            new_password: Passcode.current.value,
          });
          console.log(response?.data);
          setSnackValue({
            message: response?.data?.message,
            variant: response?.data?.variant,
          });
          setSnackOn(true);
          if (response?.data?.variant === "success") {
            setTimeout(() => {
              navigate("/SignUp/login");
            }, 3000);
          }
        })();
      } else {
        setSnackValue({
          message: "The Entered Password Does Not Match The Current Password.",
          variant: "error",
        });
        setSnackOn(true);
      }
    } else {
      setSnackValue({
        message: "Please Enter Your New Password",
        variant: "error",
      });
      setSnackOn(true);
    }
  };

  setSnackOn &&
    setTimeout(() => {
      setSnackOn(false);
    }, 2000);

  const GetEmail = () => {
    useEffect(() => {
      Gmail.current.focus();
    });
    return (
      <div className="w-full ">
        <p className="w-full text-left max-md:text-sm">Enter Your Gmail</p>
        <input
          name="SendMeCode"
          className="p-3 my-4 border border-gray-500 rounded-lg w-80"
          form="CodeSender"
          type="eamil"
          ref={Gmail}
        ></input>
      </div>
    );
  };

  const VerifyOTP = () => {
    useEffect(() => {
      OTP.current.focus();
    });
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <p className="w-full text-left">
          Please Enter The OTP Received Via Email
        </p>
        <p className="text-xs text-red-500">
          If Not Recieved Please Check Your Spam Section
        </p>
        <input
          className="p-3 my-4 border border-gray-500 rounded-lg w-80"
          form="FinalForm"
          ref={OTP}
        ></input>
      </div>
    );
  };

  const NewPassword = () => {
    useEffect(() => {
      Passcode.current.focus();
    });
    return (
      <div className="w-full">
        <p className="w-full text-left">Enter Your New Password</p>
        <input
          name="newpasscode"
          className="p-3 my-4 border border-gray-500 rounded-lg w-80"
          form="ResetForm"
          ref={Passcode}
        ></input>
        <p className="w-full text-left">Please Confirm Your Password</p>
        <input
          name="repassword"
          className="p-3 my-4 border border-gray-500 rounded-lg w-80"
          form="ResetForm"
          ref={ConfirmPasscode}
        ></input>
        {visiblemodel && (
          <Link to={"/SignUp/login"}>
            <p className="Return">Return To Login Page</p>
          </Link>
        )}
      </div>
    );
  };

  const Slides = [
    { val: <GetEmail /> },
    { val: <VerifyOTP /> },
    { val: <NewPassword /> },
  ];

  const NextStepTracker = () => {
    if (count === 0) {
      DispatchOTP();
    } else if (count === 1) {
      Verify();
    }
  };

  return (
    <div className="h-40 w-80">
      <div>{Slides[count].val}</div>

      {snackOn && (
        <SnackBar message={SnackValue.message} variant={SnackValue.variant} />
      )}
      {loader ? (
        <div className="flex flex-row items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#22C55E"
              stroke="#22C55E"
              stroke-width="15"
              r="15"
              cx="40"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#22C55E"
              stroke="#22C55E"
              stroke-width="15"
              r="15"
              cx="100"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#22C55E"
              stroke="#22C55E"
              stroke-width="15"
              r="15"
              cx="160"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between w-full">
          <button
            className={`pt-1 pb-1 pl-4 pr-4 text-white bg-red-500 rounded-lg ${
              count === 0 && "cursor-not-allowed"
            }`}
            onClick={() => setCount((prev) => prev - 1)}
            disabled={count === 0 ? true : false}
          >
            Back
          </button>
          {count !== Slides.length - 1 && (
            <button
              className="pt-1 pb-1 pl-4 pr-4 text-white bg-green-500 rounded-lg"
              onClick={NextStepTracker}
            >
              Next
            </button>
          )}
          {count === Slides.length - 1 && (
            <button
              className="pt-1 pb-1 pl-4 pr-4 text-white bg-green-500 rounded-lg"
              onClick={UpdatePassword}
            >
              Change
            </button>
          )}
        </div>
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
