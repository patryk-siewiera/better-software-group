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
	const [pageNumber, setPageNumber] = useState(1);

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
					goToPage={(pageId) => {
						setPageNumber(pageId);
					}}
					jwtToken={jwtToken}
					pageNumberHandler={pageNumber}
				/>
			</Route>
			<Route exact path="/player">
				{/* TODO generate ID per page  /:id */}
				<Player
					jwtToken={jwtToken}
					goToLogin={() => history.push("./")}
					goToPlaylist={() => history.push("./playlist")}
					videoId={pageNumber}
				/>
			</Route>
		</Switch>
	);
}

export default App;
