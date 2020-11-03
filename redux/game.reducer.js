const initialState = {
	players: [],
	fichesPoll: 21,
	status: 'wait'
  };
  
  export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_GAME_PLAYER_LIST':
			return {
				...state,
				players: [...action.payload.players]
			}
	  default:
		return state;
	}
  };
  