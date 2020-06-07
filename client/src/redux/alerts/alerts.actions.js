import alertActions from "./alerts.types";

export const initAlert = (msg, alertType) => ({
  type: alertActions.INIT_ALERT,
  payload: { msg, alertType }
});

export const setAlert = (alert) => ({
  type: alertActions.SET_ALERT,
  payload: { ...alert }
});

export const removeAlert = (id) => ({
  type: alertActions.REMOVE_ALERT,
  payload: id
});
