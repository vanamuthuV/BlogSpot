import axios from "axios";
// import { auth } from "../hooks/useAuth";

import useAuth from "../hooks/useAuth";
const BASE_URL = "http://localhost:5000";

export default axios.create({
  baseURL: BASE_URL,
});

// export const apiInstance = async () => {
//   const { auth } = useAuth();
//   console.log(auth)
//   return axios.create({
//     baseURL: BASE_URL,
//     responseType: "json",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${auth.accessToken}`,
//     },
//   });
// };

// export const TokenExtractor = () => {
//   const { auth } = useAuth();
//   console.log(auth)
//   return auth.accessToken;
// };

// export const apiInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials : true
// });


// // console.log(apiInstance);

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });
