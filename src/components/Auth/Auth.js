import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Avatar, Grid, Container } from "@material-ui/core";
import LockOulinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";

import Icon from "./icon";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
//actions
import { authoriseUser, signin, signup } from "../../actions/auth";
//styles
import "../../styles/Auth.css";
import { BootstrapButton, CssTextField, useStyles } from "./style";

//components
import ForgetPassword from "../ForgetPassword/ForgetPassword";

const initialState = { name: "", email: "", password: "", confirmPassword: "" };
toast.configure();
const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isVerified, setIsVerified] = React.useState(false);
  const [isSignup, setSignUp] = React.useState(false);
  const [formData, setFormData] = React.useState(initialState);
  const [isForgetPassword, setIsForgetPassword] = React.useState(false);

  const classes = useStyles();

  const handleForgetPassword = () => {
    console.log("Just pressed forget password");
    setIsForgetPassword(true);
  };
  const handleRecaptchaChange = () => {
    setIsVerified(!isVerified);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("FormData", formData);
    if (isVerified) {
      if (isSignup) {
        dispatch(signup(formData, history));
      } else {
        dispatch(signin(formData, history));
      }
    }
  };

  const switchMode = () => {
    setIsVerified(false);
    setSignUp(!isSignup);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    //this ? here if res is undefined then will not through error instead give undefined
    const result = res?.profileObj;
    const token = res?.tokenId;
    let data = { result, token };
    try {
      toast("Sign In Successfull");
      dispatch(authoriseUser(data));
      history.push("/");
    } catch (error) {
      console.log(error);
      toast("Error in Sign In");
    }
  };

  const googleFailure = () => {
    console.log("Unsuccessfull Google Sign In, Try Again");
    toast("Failed to login!!");
  };
  return isForgetPassword ? (
    <Container component="main" maxWidth="xs">
      <ForgetPassword setIsForgetPassword={setIsForgetPassword} />
    </Container>
  ) : (
    <Container component="main" maxWidth="xs">
      <div className="formContainer">
        <Avatar>
          <LockOulinedIcon />
        </Avatar>
        <h5>{isSignup ? "Sign Up" : "Sign In"}</h5>
        <form className={classes.root} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <div className="form">
                <div style={{ marginBottom: 8 }}>
                  <CssTextField
                    label="Name"
                    name="name"
                    required
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    InputLabelProps={{ className: "textFieldLabel" }}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <CssTextField
                    label="E-mail"
                    name="email"
                    required
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    InputLabelProps={{ className: "textFieldLabel" }}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <CssTextField
                    label="Password"
                    name="password"
                    type="password"
                    required
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    InputLabelProps={{ className: "textFieldLabel" }}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <CssTextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    required
                    fullWidth
                    className={classes.textField}
                    InputLabelProps={{ className: "textFieldLabel" }}
                    onChange={handleChange}
                  />
                </div>
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={handleRecaptchaChange}
                />
                <BootstrapButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  style={{ color: "orange" }}
                  disabled={!isVerified}
                >
                  Sign Up
                </BootstrapButton>
                <p>
                  Already have an account?&nbsp; &nbsp;{" "}
                  <span
                    className="formLast"
                    style={{ color: "#36454F", fontWeight: "bolder" }}
                    onClick={switchMode}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            )}
            {!isSignup && (
              <div className="form">
                <div style={{ marginBottom: 8 }}>
                  <CssTextField
                    label="E-mail"
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    className={classes.textField}
                    InputLabelProps={{ className: "textFieldLabel" }}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <CssTextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    required
                    fullWidth
                    className={classes.textField}
                    style={{ color: "white" }}
                    InputLabelProps={{ className: "textFieldLabel" }}
                    onChange={handleChange}
                  />
                </div>
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={handleRecaptchaChange}
                />

                <BootstrapButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  style={{ color: "orange" }}
                  disabled={!isVerified}
                >
                  Sign In
                </BootstrapButton>
                <GoogleLogin
                  clientId="585028867575-nio5ceos0p3stved50988ce0lidhjqhm.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <BootstrapButton
                      variant="contained"
                      className={classes.googleButton}
                      style={{ color: "orange" }}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      startIcon={<Icon />}
                    >
                      Google Sign In
                    </BootstrapButton>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                />

                <p
                  onClick={handleForgetPassword}
                  style={{
                    color: "#36454F",
                    fontFamily: "cursive",
                    cursor: "pointer",
                  }}
                >
                  Forget Password?
                </p>
                <p>
                  Don't have an account?&nbsp; &nbsp;{" "}
                  <span
                    className="formLast"
                    style={{ color: "#36454F", fontWeight: "bolder" }}
                    onClick={switchMode}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            )}
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Auth;
