const initialState = {
	name: "",
	fiches: 0,
	connected: false,
	token: "",
	ready: false,
	isInit: false
};

export default (state = initialState, action) => {
  switch (action.type) {
	case 'LOCAL_PLAYER_READY_STATUS':
		return {
			...state,
			ready: action.payload.ready,
		}
    case "NEW_LOCAL_PLAYER":
      return {
		name: action.payload.name,
		fiches: action.payload.fiches,
		connected: action.payload.connected,
		token: action.payload.token,
		ready: action.payload.ready,
		isInit: action.payload.isInit,
      };
    default:
      return state;
  }
};
