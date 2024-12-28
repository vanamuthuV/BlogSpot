import { useContext, useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import "../SignUp/SignUp.css";
import axios from "../../../api/axios.jsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
const Login_URL = "/auth/login";
import { SnackBar } from "./Alert.jsx";
import { FaGoogle } from "react-icons/fa";
import { useSnackbarContext } from "../../context/snackProvider.jsx";
import { Loader } from "lucide-react";

export const Login = () => {
  const { auth, setAuth, setUser } = useAuth();
  const [alert, setAlert] = useState(false);
  const Gmail = useRef(null);
  const Passcode = useRef(null);
  const [Snack, setSnack] = useState(null);
  const { showSnackbar } = useSnackbarContext();
  const navigate = useNavigate();

  useEffect(() => {
    Gmail.current.focus();
  }, []);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      email: Gmail.current.value,
      passcode: Passcode.current.value,
    };

    try {
      const response = await axios.post(Login_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response?.data);

      const accessToken = response?.data?.data?.accessToken;
      if (response?.data?.data?.user[0].verified) {
        localStorage.setItem("accessToken", accessToken);
      }

      localStorage.setItem("user_id", response?.data?.data?.user[0].user_id);

      setAuth({
        Gmail: Gmail.current.value,
        Passcode: Passcode.current.value,
        user_id: response?.data?.data?.user[0].user_id,
        accessToken,
      });
      setUser(response?.data?.data?.user[0]);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      showSnackbar(response?.data?.message, response?.data?.success);
    } catch (error) {
      console.log(error.message);
      showSnackbar(error?.response?.data?.message, false);
    }
  };

  return (
    <>
      {alert && Snack}
      <div className="w-2/4 max-md:w-11/12">
        <h1 className="mt-5 mb-5 text-xl font-semibold text-center text-orange-500 max-md:text-sm">
          Login Page
        </h1>
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
  const [visiblemodel, setVisibleModel] = useState(false);

  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [gmail, setGmail] = useState("");
  const [snackOn, setSnackOn] = useState(false);
  const { showSnackbar } = useSnackbarContext();
  const [SnackValue, setSnackValue] = useState({
    message: "",
    variant: "",
  });

  const PASSWORDUPDATE = "/account/password/email";

  const navigate = useNavigate();

  const Gmail = useRef("");
  const OTP = useRef("");
  const Passcode = useRef("");
  const ConfirmPasscode = useRef("");

  const [otp, setOTP] = useState("");

  const DispatchOTP = async () => {
    if (Gmail.current.value) {
      const data = {
        email: Gmail.current.value.trim(),
        type: "pass",
      };
      setGmail(Gmail.current.value.trim());
      try {
        setLoader(true);
        // console.log(data);
        const response = await axios.post("/account/emailotp", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        showSnackbar(response?.data?.message, response?.data?.success);

        setOTP(response?.data?.data);
        setCount((prev) => prev + 1);
        setLoader(false);
      } catch (error) {
        console.log(error);
        showSnackbar(error?.response?.data?.message, false);
      }
    } else {
      showSnackbar("Please Enter The Gmail", false);
    }
  };

  const Verify = () => {
    setLoader(true);
    if (OTP.current?.value) {
      if (Number(OTP.current?.value) === otp) {
        showSnackbar("OTP Validation Success", true);
        setCount((prev) => prev + 1);
      } else {
        showSnackbar("OTP incorrect", false);
      }
    } else {
      showSnackbar("Please Enter the OTP", false);
    }
    setLoader(false);
  };

  const UpdatePassword = () => {
    console.log(gmail)
    if (Passcode.current.value && ConfirmPasscode.current.value) {
      if (Passcode.current.value === ConfirmPasscode.current.value) {
        (async () => {
          try {
            const response = await axios.patch(PASSWORDUPDATE, {
              user_email: gmail,
              new_password: Passcode.current.value,
            });
            if (response?.data?.success) {
              showSnackbar(response?.data?.message, response?.data?.success);
              navigate("/SignUp/login");
            }
          } catch (error) {
            showSnackbar(error?.response?.data?.message, false);
          }
        })();
      } else {
        showSnackbar(
          "The Entered Password Does Not Match The Current Password.",
          false
        );
      }
    } else {
      showSnackbar("Please Enter Your New Password", false);
    }
  };

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
          <Loader className="animate-spin" />
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
