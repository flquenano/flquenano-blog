import { userAction } from "./user.types";

export const emailLoginStart = (credentials) => ({
  type: userAction.EMAIL_LOGIN_START,
  payload: credentials
});

export const checkUserSession = () => ({
  type: userAction.CHECK_USER_SESSION
});

export const loginSuccess = (user) => ({
  type: userAction.LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: userAction.LOGIN_FAILURE,
  payload: error
});

export const registerStart = (userInfo) => ({
  type: userAction.REGISTER_START,
  payload: userInfo
});

export const registerSucces = ({ user, additionalData }) => ({
  type: userAction.REGISTER_SUCCESS,
  payload: { user, additionalData }
});

export const registerFailure = (error) => ({
  type: userAction.REGISTER_FAILURE,
  payload: error
});

export const logoutStart = () => ({
  type: userAction.LOGOUT_START
});

export const logoutSuccess = () => ({
  type: userAction.LOGOUT_SUCCESS
});
