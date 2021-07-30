import { useState } from "react";
import {
	Route, Switch, useHistory
} from "react-router-dom";
import Login from "./login";
import Player from "./player";
import Playlist from "./playlist";

function App() {
	const history = useHistory();
	const [jwtToken, setJwtToken] = useState("");
	const [videoId, setVideoId] = useState(undefined);
	const [pageNumber, setPageNumber] = useState(1);
	const [appMediaListIdHandler, setAppMediaListIdHandler] = useState(2);

	return (
		<Switch>
			<Route exact path="/">
				<Login
					onLogin={(token, mediaListIdHandler) => {
						setJwtToken(token);
						setAppMediaListIdHandler(mediaListIdHandler);
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
					mediaListIdPlaylist={appMediaListIdHandler}
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
