import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import PlayersList from "../components/PlayerList";
import NewPlayerForm from "../components/NewPlayerForm";

const Index = () => {
  const styles = StyleSheet.create({
    formNewGame: {
      display: "flex",
      flexFlow: "column-reverse wrap",
      width: "60%",
      margin: "50px auto",
    },
  });

  const dispatch = useDispatch()
	
  const player = useSelector((state) => state.localPlayerReducer.name);
  const gameStatus = useSelector((state)=> state.gameReducer.status)
  const socket = useSelector((state)=> state.socketReducer.socket)

  const cookies = parseCookies()
  console.log({ cookies })

  useEffect(()=>{
	  if (socket !== null){
		  socket.emit('new_player', {name: player, token:cookies.token})
		  socket.on('playersList', data =>{
			  dispatch({type: "GAME_SET_PLAYERS", payload:{players:data}})
		  })
	  }
	  return () => {
		if (socket !== null) {
		  socket.disconnect();
		}
	  };
  }, [socket])

  if (gameStatus === 'wait') {
    return (
      <div className={css(styles.formNewGame)}>
        <PlayersList />
		{(!player || !socket)
		? <NewPlayerForm />
		: null
		}
      </div>
    );
  } else {
    return <div>the game will start</div>;
  }
};

export default Index;

