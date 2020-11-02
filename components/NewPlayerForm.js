import React, { useState } from "react";
import { css, StyleSheet } from "aphrodite/no-important";
import { useDispatch } from "react-redux";

import {newLocalPlayer} from '../redux/localPlayer.reducer'

export default function NewPlayerForm() {
  const styles = StyleSheet.create({
    NewPlayerForm: {
      margin: "25px",
      display: "flex",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      padding: "10px",
    },
    fieldsetForm: {
      width: "50%",
      //   position: "absolute",
      //   left: "50%",
      //   top: "50%",
      //   transform: "translate(-50%, -50%)",
      display: "block",
    },
    form: {
      position: "relative",
      display: "block",
      margin: "15px",
      with: "calc(100% - 30px)",
    },
    formInput: {
      width: "calc(100% - 10px)!important",
      margin: "2px auto",
      display: "block",
      padding: "auto",
      height: "50px",
    },
    formSpan: {
      display: "block",
    },
    formSubmit: {
      display: "block",
      width: "100%",
      border: "none",
      backgroundColor: "rgba(125, 125, 125, 0.4)",
      padding: "14px 28px",
      fontSize: "16px",
      cursor: "pointer",
      textAlign: "center",
    },
  });

  const [pseudo, setPseudo] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
	e.preventDefault();
	if (pseudo !== ''){
		dispatch(newLocalPlayer(pseudo))
		setPseudo('')
	}
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={css(styles.NewPlayerForm)}>
        <fieldset className={css(styles.fieldsetForm)}>
          <legend>New player</legend>
          <div className={css(styles.form)}>
            <span className={css(styles.formSpan)}>pseudo</span>
            <input
              name="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className={css(styles.formInput)}
            />
          </div>
          <div className={css(styles.form)}>
            <button
              name="submit"
              type="submit"
              className={css(styles.formSubmit)}
            >
              submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
