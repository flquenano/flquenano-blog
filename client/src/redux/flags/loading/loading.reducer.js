const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(START|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;
  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === "START"
  };
};

export default loadingReducer;
