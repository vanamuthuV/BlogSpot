import React from "react";
import { ContentBody } from "./assets/body/body";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { Login } from "./assets/Login/Login";
import { SignUp } from "./assets/SignUp/SignUp";
import { SignUpLayout } from "./Layout";
import { ForgetPasscode } from "./assets/Login/Login";
import { ForgetUsername } from "./assets/Login/Login";
import { GetUsers } from "./assets/Login/Login";
import { CreatePost } from "./assets/createpost/createpost";
import { PostRequester } from "./assets/PostRequester/PostRequester";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ContentBody />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/SignUp" element={<SignUpLayout />}>
            <Route path="/SignUp" element={<SignUp />} />
              <Route path="/SignUp/login" element={<Login />} />
            <Route path="/SignUp/forgetusername" element={<ForgetUsername />} />
            <Route path="/SignUp/forgetpasscode" element={<ForgetPasscode />} />
            <Route path="/SignUp/users" element={<GetUsers />} />
          </Route>
          <Route path="/Read Blog" element={<PostRequester />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
