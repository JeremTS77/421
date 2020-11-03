import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css, StyleSheet } from "aphrodite/no-important";
import { parseCookies } from "nookies";
import io from "socket.io-client";

import PlayersList from "../components/PlayerList";
import NewPlayerForm from "../components/NewPlayerForm";
import ReadyButton from "../components/ReadyButton";

const Index = () => {
  const styles = StyleSheet.create({
    formNewGame: {
      display: "flex",
      flexFlow: "column-reverse wrap",
      width: "60%",
      margin: "50px auto",
    },
  });

  const dispatch = useDispatch();

  const player = useSelector((state) => state.localPlayerReducer.name);
  const isInit = useSelector((state) => state.localPlayerReducer.isInit);
  const gameStatus = useSelector((state) => state.gameReducer.status);
  const socket = useSelector((state) => state.socketReducer.socket);
  const players = useSelector((state) => state.gameReducer.players);

  const cookies = parseCookies();

  useEffect(() => {
    if (socket === null) {
      const socket = io();
      dispatch({ type: "SOCKET_CONNECTION", payload: { io: socket } });
      socket.emit("reconnectPlayer", { token: cookies.token });
    } else {
      socket.on("playersList", (data) => {
        dispatch({ type: "SET_GAME_PLAYER_LIST", payload: { players: data } });
        for (let i = 0; data[i]; ++i) {
          if (data[i].token === cookies.token && !isInit) {
            dispatch({
              type: "NEW_LOCAL_PLAYER",
              payload: { ...data[i], isInit: true },
            });
          }
        }
      });
    }
  });

  if (gameStatus === "wait") {
    return (
      <div className={css(styles.formNewGame)}>
        <PlayersList />
        {!player || !socket ? <NewPlayerForm /> : <ReadyButton />}
      </div>
    );
  } else {
    return <div>the game will start</div>;
  }
};

export default Index;
