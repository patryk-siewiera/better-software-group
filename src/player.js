import React, { Suspense, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getPlayer } from "./api";
import "./player.css";

export default function Player({ goToLogin, goToPlaylist, videoId, jwtToken }) {
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [playerData, setPlayerData] = useState([]);

	useEffect(
		(res) => {
			if (jwtToken === "" && isDataLoaded) {
				goToLogin();
			} else {
				getPlayer(videoId, jwtToken).then((res) => {
					setPlayerData(res);
					setIsDataLoaded(true);
				});
			}
		},
		[isDataLoaded]
	);

	function urlHandler(playerData) {
		if (playerData.ContentUrl === undefined) {
			return <div className="contentUrl">Video not available</div>;
		} else {
			return (
				<div className="contentUrl">
					{/* width and height is 16:9 ratio */}
					<ReactPlayer
						style={{ margin: "auto" }}
						url={playerData.ContentUrl}
						width="64rem"
						height="36rem"
						controls={true}
						playing={true}
					/>
				</div>
			);
		}
	}

	return (
		<div>
			<Suspense fallback={<div>loading...</div>}>
				<div className="buttonBack">
					<button onClick={goToPlaylist} className="buttongoToLogin">
						&lt;- Go Back to Playlist
					</button>
				</div>
				<div className="titleVideo">{playerData?.Title}</div>
				{urlHandler(playerData)}
				<div className="descriptionVideo">
					{playerData?.Description}
				</div>
				<div className="mediaTypeDisplayNameVideo">
					{playerData?.MediaTypeDisplayName}
				</div>
			</Suspense>
		</div>
	);
}
