import { AUTH, LOGOUT } from "./actionType/actionType";
import * as api from "../api/index.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const authoriseUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};
export const Logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    toast("Logout Successfully");
  } catch (error) {
    console.log(error);
    toast("Error in Logout!!");
  }
};
export const signin = (formData, history) => async (dispatch) => {
  try {
    //log in the user
    const { data } = await api.signIn(formData);
    const { message } = data;

    if (data.result) {
      history.push("/");
      const action = { type: AUTH, data };
      dispatch(action);
    }

    if (message) {
      toast(`${message}`);
    } else {
      toast("Sign In Successfull");
    }
  } catch (error) {
    console.log(error.message);
    toast("Error in Sign In");
  }
};
export const signup = (formData, history) => async (dispatch) => {
  try {
    //sign up the user
    const { data } = await api.signUp(formData);
    // console.log("signUp data", data);
    const { message } = data;
    if (data.result) {
      const action = { type: AUTH, data };
      dispatch(action);

      history.push("/");
    }
    if (message) {
      toast(`${message}`);
    } else {
      toast("Sign Up Successfull");
    }
  } catch (error) {
    console.log(error);
    toast("Error in Sign Up");
  }
};
export const resetPassword = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.resetPassword(formData);
    // console.log(data);
    const { message } = data;
    if (data.result) {
      const action = { type: AUTH, data };
      dispatch(action);

      history.push("/");
    }
    if (message) {
      toast(`${message}`);
    } else {
      toast("Password Reset Successfully");
    }
  } catch (error) {
    console.log(error);
    toast("Error in reseting the password");
  }
};
export const forgetPassword = (email) => async (dispatch) => {
  try {
    const { data } = await api.forgetPassword(email);
    const { message } = data;
    if (message) {
      toast(`${message}`);
    }
  } catch (error) {
    console.log(error);
  }
};
