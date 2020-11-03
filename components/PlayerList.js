import { css, StyleSheet } from "aphrodite/no-important";
import React from "react";
import { useSelector } from "react-redux";

export default function PlayerList() {
  const styles = StyleSheet.create({
    playerList: {
      margin: "25px",
      textAlign: "center",
    },
  });
  const players = useSelector((state) => state.gameReducer.players);
  const localPlayerName = useSelector((state) => state.localPlayerReducer.name);
  return (
    <table className={css(styles.playerList)}>
      <thead>
        <tr>
          <th></th>
          <th>name</th>
          <th>fiches</th>
          <th>connected</th>
		  <th>ready</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => {
			return (
				<tr key={`players-list-player-${player.name}`}>
              <td>{localPlayerName === player.name ? ">" : null}</td>
              <td>{player.name}</td>
              <td>{player.fiches}</td>
              <td>{player.connected.toString()}</td>
			  <td>{player.ready.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
