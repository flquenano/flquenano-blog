import alertAction from "./alerts.types";

const INIT_STATE = [];

export default function (state = INIT_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case alertAction.SET_ALERT:
      return { ...state, payload };
    case alertAction.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
