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
					<div className="titleInput">Login</div>
					<input type="text" className="inputText" />
				</div>
				<div className="groupInput">
					<div className="titleInput">Password</div>

					<input type="text" className="inputText" />
				</div>
				<button type="submit" className="buttonSubmit">
					Login
				</button>
			</form>
			<form action="" onSubmit={handleLogin}>
				<button type="submit" className="buttonSubmit">
					Login anonymously
				</button>
				{/* write here some generated accounts login data */}
			</form>
			<div className="bottomText">Better Software Group</div>
		</div>
	);
}
