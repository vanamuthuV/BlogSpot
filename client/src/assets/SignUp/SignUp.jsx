import { useEffect, useRef, useState, useContext } from "react";
import "./SignUp.css";
import axios from "../../../api/axios.jsx";
import { Link, useNavigate } from "react-router-dom";

const SignUp_URL = "/SignUp";

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

  return (
    <div div className="Login">
      <h1>Sign Up Page</h1>
      <form
        className="Gmail-form"
        onSubmit={(event) => {
          SubmitHandler(event);
        }}
        action=""
        method="post"
      >
        <input
          type="text"
          className="input"
          placeholder="Enter Your Username "
          ref={UserName}
        ></input>
        <input
          className="input"
          ref={Gmail}
          placeholder="What Is Your Gmail ? "
        ></input>
        <input
          className="input"
          type="password"
          ref={Passcode}
          placeholder="Give Me A Passcode "
        ></input>
        <button className="Submit" type="Submit">
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