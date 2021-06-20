import React from "react";

import { Button, Avatar } from "@material-ui/core";
import "../../styles/Navbar.css";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Logout } from "../../actions/auth";

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  // console.log("user", user);
  const logout = () => {
    dispatch(Logout());
    //here display the notification of logout

    history.push("/auth");
    setUser(null);
  };

  React.useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="bar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo" style={{ color: "white" }}>
          <span>E-commerce</span>
        </div>
      </Link>
      <div className="toolbar">
        {user?.result ? (
          <div className="profile">
            <Avatar
              src={user.result.imageUrl}
              alt={user.result.name}
              className={classes.purple}
              style={{ textAlign: "center" }}
            >
              <h5 className="avatarText">
                {user.result.name.charAt(0).toUpperCase()}
              </h5>
            </Avatar>

            <h4 className={classes.userName}>{user.result.name}</h4>

            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "10px" }}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/auth" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
