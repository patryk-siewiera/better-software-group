import { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
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
			<Route exact path={"/"}>
				<Login
					onLogin={(token, mediaListIdHandler) => {
						setJwtToken(token);
						setAppMediaListIdHandler(mediaListIdHandler);
						history.push(
							"/playlist/MediaListId=" +
								mediaListIdHandler +
								"/page=" +
								pageNumber
						);
					}}
				/>
			</Route>
			<Route exact path={"/playlist/MediaListId=:mediaId/page=:pageId"}>
				<Playlist
					goToLogin={() => {
						setJwtToken("");
						history.push("/");
					}}
					goToPlayer={(videoId) => {
						setVideoId(videoId);
						history.push(
							"./page=" + pageNumber + "/player=" + videoId
						);
					}}
					goToPage={(pageId) => {
						setPageNumber(pageId);
						history.push(
							"/playlist/MediaListId=" +
								appMediaListIdHandler +
								"/page=" +
								pageId
						);
					}}
					jwtToken={jwtToken}
					pageNumberHandler={pageNumber}
					mediaListIdPlaylist={appMediaListIdHandler}
				/>
			</Route>
			<Route
				exact
				path="/playlist/MediaListId=:mediaId/page=:id/player=:pageId"
			>
				{/* TODO generate ID per page  /:id */}
				<Player
					jwtToken={jwtToken}
					goToLogin={() => history.push("./")}
					goToPlaylist={() =>
						history.push(
							"/playlist/MediaListId=" +
								appMediaListIdHandler +
								"/page=" +
								pageNumber
						)
					}
					videoId={videoId}
				/>
			</Route>
			<Route render={() => <Redirect to="/" />} />
		</Switch>
	);
}

export default App;
