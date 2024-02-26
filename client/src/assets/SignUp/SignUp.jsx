import { useEffect, useRef, useState, useContext } from "react";
import "./SignUp.css";
import axios from "../../../api/axios.jsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SignUp_URL = "/SignUp";

const USERNAMECHECK = "/uncheck";
const EMAILCHECK = "/uecheck";

export const SignUp = () => {
  const UserName = useRef(null);
  const Gmail = useRef(null);
  const Passcode = useRef(null);

  const [visiblemodel, setVisibleModel] = useState(false);

  const SubmitHandler = (event) => {
    event.preventDefault();
    axios.post(SignUp_URL, {
      username: UserName.current.value,
      email: Gmail.current.value,
      passcode: Passcode.current.value,
    });
    setVisibleModel((prev) => !prev);
  };

  const [Pos, setPos] = useState(false);
  const [Neg, setNeg] = useState(false);
  const [PosE, setPosE] = useState(false);
  const [NegE, setNegE] = useState(false);

  const CheckUserName = async () => {
    const data = {
      username: UserName.current.value,
    };

    if (!UserName.current.value) {
      console.log("Hello Null");
      setPos(false);
      setNeg(false);
      return;
    }

    try {
      const response = await axios.post(USERNAMECHECK, data);
      console.log(response?.data?.data);
      if (response?.data?.data) {
        setPos(true);
        setNeg(false);
      } else {
        setPos(false);
        setNeg(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CheckEmail = async () => {
    const data = {
      email: Gmail.current.value,
    };
    console.log(Gmail.current.value);
    if (!Gmail.current.value) {
      console.log("Hello Null");
      setPosE(false);
      setNegE(false);
      return;
    }

    try {
      const response = await axios.post(EMAILCHECK, data);
      console.log(response?.data?.data);
      if (response?.data?.data) {
        setPosE(true);
        setNegE(false);
      } else {
        setPosE(false);
        setNegE(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UserName.current.focus();
  }, []);

  return (
    <div div className=" Login">
      <p className="mt-5 mb-5 text-xl font-semibold text-orange-500">
        SignUp Page
      </p>
      <form
        className="Gmail-form"
        onSubmit={(event) => {
          SubmitHandler(event);
        }}
        action=""
        method="post"
      >
        <div className="w-full">
          {Pos && (
            <h1 className="flex flex-row items-center justify-start text-xs text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 pr-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clip-rule="evenodd"
                />
              </svg>
              Username Available.
            </h1>
          )}
          {Neg && (
            <h1 className="flex flex-row items-center justify-start text-xs text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 pr-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clip-rule="evenodd"
                />
              </svg>
              Username Already Taken.
            </h1>
          )}
        </div>

        <input
          type="text"
          className="mt-2 input focus:outline-none"
          placeholder="Enter Your Username "
          ref={UserName}
          onChange={CheckUserName}
          pattern="^[a-z0-9]+$"
          title="This field is won't Allow White Spces and required"
          required
        ></input>

        <div className="w-full">
          {PosE && (
            <h1 className="flex flex-row items-center justify-start text-xs text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 pr-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clip-rule="evenodd"
                />
              </svg>
              Email Available.
            </h1>
          )}

          {NegE && (
            <h1 className="flex flex-row items-center justify-start text-xs text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 pr-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clip-rule="evenodd"
                />
              </svg>
              Email Already Taken.
            </h1>
          )}
        </div>
        <input
          className="mt-2 input focus:outline-none"
          ref={Gmail}
          onChange={CheckEmail}
          required
          pattern="^[a-z0-9]+(?:[._][a-z0-9]+)*@[a-z]+\.[a-z]+$"
          title="This field won't allow whitespaces and required"
          placeholder="What Is Your Gmail ? "
        ></input>
        <input
          className="mt-2 input focus:outline-none"
          type="password"
          ref={Passcode}
          placeholder="Give Me A Passcode "
          required
        ></input>
        <button
          className="pt-1.5 pb-1.5 pl-5 pr-5 bg-orange-500 rounded-xl text-gray-50 hover:border hover:border-orange-500 hover:bg-gray-50 hover:text-orange-500"
          type="Submit"
        >
          Register
        </button>
      </form>
      {visiblemodel && (
        <Link to={"/SignUp/login"}>
          <p style={{ textAlign: "center" }} className="Return">
            Return To Login Page
          </p>
        </Link>
      )}
    </div>
  );
};
