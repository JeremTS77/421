const initialState = {
	players: [],
	fichesPoll: 21,
	status: 'wait'
  };
  
  export default (state = initialState, action) => {
	switch (action.type) {
		case 'GAME_NEW_PLAYER':
			return {
				...state,
				players: [...state.players, {
					name: action.payload.name,
					fiches: 0
				}]
			}
		case 'GAME_SET_PLAYERS':
			console.log('action.payload.players : ', action.payload.players)
			return {
				...state,
				players: [...action.payload.players]
			}
	  default:
		return state;
	}
  };
  