import { css, StyleSheet } from "aphrodite/no-important";
import React from "react";
import { useSelector } from "react-redux";

export default function PlayerList() {
  const styles = StyleSheet.create({
    playerList: {
	  margin: "25px",
	  textAlign: "center"
    },
  });
  const players = useSelector((state) => state.gameReducer.players);
  return (
    <table className={css(styles.playerList)}>
      <thead>
        <tr>
          <th>name</th>
          <th>fiches</th>
		  <th>connected</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => {
          return (
            <tr key={`players-list-player-${player.name}`}>
              <td>{player.name}</td>
              <td>{player.fiches}</td>
              <td>{player.connected.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


