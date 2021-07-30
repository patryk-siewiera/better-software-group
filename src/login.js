import React from "react";
import { getLoginTokenAnonymous } from "./api";
import "./login.css";

export default function Login({ token, setJwtToken, onLogin }) {
	function getAndStoreToken() {
		return getLoginTokenAnonymous().then((token) => onLogin(token));
	}

	function handleLogin(ev) {
		getAndStoreToken();
		ev.preventDefault();
		ev.stopPropagation();
	}

	return (
		<div className="loginWindow">
			<div className="topText">React platform – TASK 1</div>
			<form action="" onSubmit={handleLogin}>
				<div className="groupInput">
					<div className="titleInput">MediaListId</div>
					<input type="number" className="inputText" />
					<div className="smallerText">put value between 1-100</div>
				</div>
				<button type="submit" className="buttonSubmit">
					Login
				</button>
			</form>
			<div className="bottomText">Better Software Group</div>
		</div>
	);
}
