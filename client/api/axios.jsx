import axios from "axios";
// import { auth } from "../hooks/useAuth";
const BASE_URL =
  "https://inkwellifyserver-git-main-vanamuthu-vs-projects.vercel.app/";

// const BASE_URL = "http://localhost:5000/";
export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});