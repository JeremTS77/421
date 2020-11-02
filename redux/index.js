import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import counterReducer from './counter.reducer'
import gameReducer from './game.reducer'
import localPlayerReducer from './localPlayer.reducer'
import socketReducer from './socket.reducer'

export default createStore(
  combineReducers({
	counterReducer,
	gameReducer,
	localPlayerReducer,
	socketReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
