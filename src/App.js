import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";
import Player from "./player";
import Login from "./login";
import Playlist from "./playlist";

function App() {
	const history = useHistory();
	const [jwtToken, setJwtToken] = useState("");
	return (
		<Switch>
			<Route exact path="/">
				<Login
					onLogin={(token) => {
						setJwtToken(token);
						history.push("/playlist");
					}}
				/>
			</Route>
			<Route exact path="/playlist">
				<Playlist goBack={() => history.push("./")} />
			</Route>
			<Route exact path="/player">
				<Player />
			</Route>
		</Switch>
	);
}

export default App;
