import { userAction } from "./user.types";

const INIT_STATE = {
  current_user: null,
  isLoggedIn: false,
  error: ""
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case userAction.LOGIN_SUCCESS:
      return {
        ...state,
        current_user: action.payload,
        isLoggedIn: true
      };

    case userAction.LOGOUT_SUCCESS:
      return {
        current_user: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default userReducer;
