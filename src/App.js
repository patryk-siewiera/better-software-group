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
	const [videoId, setVideoId] = useState(undefined);
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
				<Playlist
					goToLogin={() => history.push("./")}
					goToPlayer={(videoId) => {
						setVideoId(videoId);
						history.push("./player");
					}}
					jwtToken={jwtToken}
				/>
			</Route>
			<Route exact path="/player">
				<Player
					jwtToken={jwtToken}
					goToLogin={() => history.push("./")}
					goToPlaylist={() => history.push("./playlist")}
					videoId={videoId}
				/>
			</Route>
		</Switch>
	);
}

export default App;
