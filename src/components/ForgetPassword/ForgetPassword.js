import React from "react";
import { Grid } from "@material-ui/core";
import { BootstrapButton, CssTextField, useStyles } from "./style";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../actions/auth";

const initialState = { email: "" };

const ForgetPassword = ({ setIsForgetPassword }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState(initialState);
  const goBack = () => {
    setIsForgetPassword(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };
  const handleChange = (e) => {
    setEmail({ ...email, email: e.target.value });
  };

  return (
    <div className="forgetPassword">
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <h2>Enter the email linked to this account</h2>
          <div className="form">
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
            <BootstrapButton
              type="submit"
              variant="contained"
              className={classes.margin}
              style={{ color: "orange" }}
            >
              Send Link
            </BootstrapButton>
            <BootstrapButton
              variant="contained"
              className={classes.margin}
              style={{ color: "orange" }}
              onClick={goBack}
            >
              GoBack
            </BootstrapButton>
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default ForgetPassword;
