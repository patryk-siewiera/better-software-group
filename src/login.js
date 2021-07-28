import React from "react";
import { getLoginTokenAnonymous } from "./api";

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
		<div className="App">
			<form action="" onSubmit={handleLogin}>
				<input type="text" />
				<input type="text" />
				<button type="submit">login</button>
			</form>
		</div>
	);
}
