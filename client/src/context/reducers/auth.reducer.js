export const initialAuthState = {
  isLoggedIn: false,
  name: "",
  error: ""
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        name: action.payload.name,
        error: ""
      };
    case "LOGIN_ERROR":
      return {
        isLoggedIn: false,
        name: "",
        error: action.payload.error
      };
    case "LOGOUT":
      return {
        isLoggedIn: false,
        name: "",
        error: ""
      };
    default:
      return state;
  }
};
