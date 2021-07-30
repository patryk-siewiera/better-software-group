import React, { useState } from "react";
import { getLoginTokenAnonymous } from "./api";
import "./login.css";

export default function Login({ onLogin }) {
	const [mediaListIdHandler, setMediaListIdHandler] = useState(0);

	function getAndStoreToken() {
		return getLoginTokenAnonymous().then((token) =>
			onLogin(token, parseInt(mediaListIdHandler))
		);
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
					<input
						type="number"
						className="inputText"
						onChange={(e) => setMediaListIdHandler(e.target.value)}
						required
					/>
					<div className="smallerText">put value between 2-100</div>
				</div>
				<button type="submit" className="buttonSubmit">
					Get Movies
				</button>
			</form>
			<div className="bottomText">Better Software Group</div>
			{/* Im not able to register new user, or even login that's why there
			isn't login option here */}
		</div>
	);
}
