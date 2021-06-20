import { AUTH, LOGOUT } from "../actions/actionType/actionType";
const initialState = {
  authData: null,
  loggedIn: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      localStorage.setItem("loggedIn", "true");
      return { ...state, authData: action?.data, loggedIn: true };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
