import "./App.css";
import { getLoginTokenAnonymous } from "./api";
import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
} from "react-router-dom";
import Player from "./player";
import Login from "./login";

function App() {
	const history = useHistory();
	const [jwtToken, setJwtToken] = useState("");
	return (
		<Switch>
			<Route exact path="/">
				<Login
					onLogin={(token) => {
						setJwtToken(token);
						history.push("/player");
					}}
				/>
			</Route>
			<Route exact path="/player">
				<Player />
			</Route>
		</Switch>
	);
}

export default App;
