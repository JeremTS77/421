import io from 'socket.io-client'

const initialState = {
  name: '',
  fiches: 0,
};

export const newLocalPlayer = (name)=>(dispatch)=>{
	//call websocket 
	// localstorage.setItem('uUID', Math.random().toString(24) + new Date());
	// console.log('userLogin : ', localstorage.getItem('uUID'))
	dispatch({type: 'SOCKET_CONNECTION', payload: {io: io()}})
	dispatch({type: 'NEW_LOCAL_PLAYER', payload: {name: name}})
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "NEW_LOCAL_PLAYER":
      return {
        ...state,
		name: action.payload.name,
		fiches: 0,
      };
    default:
      return state;
  }
};
