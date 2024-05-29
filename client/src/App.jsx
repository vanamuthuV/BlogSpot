import React from "react";
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
import { PostDetails } from "./assets/postdetails/postdetails";
import { EditCaller } from "./assets/Edit/Edit";
import { ProfileCaller } from "./assets/profile/profile";
import { FollowersAndFollowingLayout } from "./assets/FollowerandFollowing/ff";
import { Followers } from "./assets/FollowerandFollowing/ff";
import { Followings } from "./assets/FollowerandFollowing/ff";
import { Accounts } from "./assets/Account/account";
import { Dashboard } from "./assets/Dashboard/dashboard";
import { LandingPage } from "./assets/LandingPage/LandingPage";
import { LeaderBoard } from "./assets/leaderboard/leaderboard";
import { PageNotFound } from "./assets/pagenotfound/pagenotfound";
import useSearch from "../hooks/useSearch";
import { Notification } from "./assets/Notifications/notifications";

function App() {
  const { searchOpen, setSearchOpen } = useSearch();
  console.log(searchOpen);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/SignUp" element={<SignUpLayout />}>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignUp/login" element={<Login />} />
            <Route path="/SignUp/forgetusername" element={<ForgetUsername />} />
            <Route path="/SignUp/forgetpasscode" element={<ForgetPasscode />} />
            <Route path="/SignUp/users" element={<GetUsers />} />
          </Route>
          <Route path="/read" element={<PostRequester />} />
          <Route path="/read/:id" element={<PostDetails />} />
          <Route path="/edit/:post_ids" element={<EditCaller />} />
          <Route path="/:user_name" element={<ProfileCaller />}></Route>
          {/* <Route path="/Search" element={<SearchLayout />}>
            <Route path="/Search" element={<Account />} />
            <Route path="/Search/Tags" element={<Tags />} />
            <Route path="/Search/Category" element={<Category />} />
            <Route path="/Search/Posts" element={<Posts />} />
          </Route> */}
          <Route
            path="/:user_name/followers"
            element={<FollowersAndFollowingLayout />}
          >
            <Route path="/:user_name/followers" element={<Followers />} />
          </Route>
          <Route
            path="/:user_name/followings"
            element={<FollowersAndFollowingLayout />}
          >
            <Route path="/:user_name/followings" element={<Followings />} />
          </Route>

          <Route path="/Account" element={<Accounts />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Leaderboard" element={<LeaderBoard />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
