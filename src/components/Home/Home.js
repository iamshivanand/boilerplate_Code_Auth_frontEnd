import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BootstrapButton, useStyles, CssTextField } from "./style";
import "../../styles/Home.css";
import { resetPassword } from "../../actions/auth";
const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  id: "",
};

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState(initialState);
  const loggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("profile"));
  // console.log("user", user);
  const userId = user?.result?._id;
  React.useEffect(() => {
    setFormData({ ...formData, id: userId });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();

    // console.log("FormData", formData);
    dispatch(resetPassword(formData, history));
    resetPasswordForm();
  };

  const resetPasswordForm = () => {
    setShowForm(!showForm);
  };

  return loggedIn ? (
    <div className="homePage">
      <h1>This is the Home Page!!!!</h1>
      {/* <BootstrapButton
        variant="contained"
        color="primary"
        className={classes.margin}
        style={{ color: "orange" }}
      >
        Logout
      </BootstrapButton> */}
      <div style={{ marginLeft: "30px" }} className="resetForm">
        {!showForm && (
          <BootstrapButton
            variant="contained"
            color="primary"
            className={classes.margin}
            style={{ color: "orange" }}
            onClick={resetPasswordForm}
          >
            Reset Password
          </BootstrapButton>
        )}

        {showForm && (
          <form onSubmit={handleResetPasswordSubmit}>
            <div style={{ marginBottom: 8 }}>
              <CssTextField
                label="Old Password"
                name="oldPassword"
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
                label="New Password"
                name="newPassword"
                type="password"
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
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                variant="outlined"
                required
                fullWidth
                className={classes.textField}
                InputLabelProps={{ className: "textFieldLabel" }}
                onChange={handleChange}
              />
            </div>
            <BootstrapButton
              type="submit"
              variant="contained"
              color="primary"
              className={classes.margin}
              style={{ color: "orange" }}
            >
              Reset Password
            </BootstrapButton>
            <BootstrapButton
              variant="contained"
              color="primary"
              className={classes.margin}
              style={{ color: "orange" }}
              onClick={resetPasswordForm}
            >
              Go Back
            </BootstrapButton>
          </form>
        )}
      </div>
      <ol>
        <p>Things to be applied</p>
        <li>Reset password after sign in</li>
        <li>password stored in db should be encrypted</li>
        <li>Google login/Signup</li>
        <li>
          Forgot password (you can either generate a random password and send on
          email, or send a reset password link which expires in some time
          [preferred])
        </li>
        <li>
          <ol>
            <p>Display notifications for</p>

            <li>unmatching passwords during sign up</li>
            <li>incorrect password during sign in</li>
          </ol>
        </li>

        <li>[Extra Points] enable re-captcha on both sign up and log in</li>
      </ol>
    </div>
  ) : (
    <div>
      <h1>Please SignIn/Signup to see the content...</h1>
    </div>
  );
};

export default Home;
