import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { parseCookies  } from "nookies";

export default function ReadyButton(){
	const dispatch = useDispatch()
	const localPlayerReady = useSelector((state) => state.localPlayerReducer.ready);
	const socket = useSelector((state)=> state.socketReducer.socket)

	const cookies = parseCookies()

	const SwapReadyStatus = (readyStatus)=>(dispatch)=>{
		dispatch({type: 'LOCAL_PLAYER_READY_STATUS', payload: {ready:readyStatus}})
		socket.emit('ready_status', {ready_status: readyStatus, token: cookies.token})
	}
	
	return (
		<button onClick={(_)=>{dispatch(SwapReadyStatus(!localPlayerReady))}}>{(localPlayerReady === false) ? "ready" : "cancel"}</button>
	)
}