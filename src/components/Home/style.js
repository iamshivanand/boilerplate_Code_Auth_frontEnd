import {
  makeStyles,
  createMuiTheme,
  withStyles,
} from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { green, purple } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);
export const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#7B7B7C",
    borderColor: "#7B7B7C",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#252324",
      borderColor: "#252324",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#28282b",
      borderColor: "#28282b",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(200,203,255,0.2)",
    },
  },
})(Button);

export const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  textField: {
    width: "40ch",
    borderColor: "white",
  },
}));

export const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
