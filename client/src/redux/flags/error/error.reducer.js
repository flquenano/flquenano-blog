export const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);
  console.log(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  console.log(requestName, requestState, payload.message);
  return {
    ...state,
    [requestName]: requestState === "FAILURE" ? payload.message : ""
  };
};

export default errorReducer;
