const onCheckboxClick = (store) => (next) => (action) => {
  return next(action); // this will pass the action to the next middleware in the chain.
};

export default onCheckboxClick;
