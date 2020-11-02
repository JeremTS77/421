const initialState = {
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE": {
      return {
        ...state,
        count: state.count + action.payload,
      };
    }
    case "DECREASE": {
      return {
        ...state,
        count: state.count - action.payload,
      };
    }
    default:
      return state;
  }
};
