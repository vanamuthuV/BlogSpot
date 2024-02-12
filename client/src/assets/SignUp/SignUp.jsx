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
        <input
          type="text"
          className="input focus:outline-none"
          placeholder="Enter Your Username "
          ref={UserName}
          pattern="^[a-z0-9]+$"
          title="This field is won't Allow White Spces and required"
          required
        ></input>
        <input
          className="input focus:outline-none"
          ref={Gmail}
          required
          pattern="^[a-z0-9]+(?:[._][a-z0-9]+)*@[a-z]+\.[a-z]+$"
          title="This field won't allow whitespaces and required"
          placeholder="What Is Your Gmail ? "
        ></input>
        <input
          className="input focus:outline-none"
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
