import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000" });

export const signIn = (FormData) => API.post("/user/signin", FormData);
export const signUp = (FormData) => API.post("/user/signup", FormData);
export const resetPassword = (FormData) =>
  API.patch("user/resetpassword", FormData);
export const forgetPassword = (email) =>
  API.post("/user/forgetPassword", email);
