import io from "socket.io-client";
const initialState = {
  socket: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SOCKET_CONNECTION":
      return {
        ...state,
        socket: action.payload.io
	  };
	case "SOCKET_DISCONNECT":
		return {
			...state,
			socket: null
		}
    default:
      return state;
  }
};
