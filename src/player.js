import React, { useState, useEffect } from "react";
import Playlist from "./playlist";
import { getPlayer } from "./api";
import "./player.css";

export default function Player({ goToLogin, goToPlaylist, videoId, jwtToken }) {
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [playerData, setPlayerData] = useState([]);

	useEffect((res) => {
		if (jwtToken === "") {
			goToLogin();
		} else {
			getPlayer(videoId, jwtToken).then((res) => {
				setPlayerData(res);
			});
		}
	}, []);

	function urlHandler(playerData) {
		if (playerData.ContentUrl === undefined) {
			return <div className="contentUrl">Video not available</div>;
		} else {
			return <div className="contentUrl">{playerData.ContentUrl}</div>;
		}
	}

	return (
		<div>
			<div className="buttonBack">
				<button onClick={goToPlaylist} className="buttongoToLogin">
					&lt;- Go Back to Playlist
				</button>
			</div>
			<div className="titleVideo">{playerData?.Title}</div>
			{urlHandler(playerData)}
			<div className="descriptionVideo">{playerData?.Description}</div>
			<div className="mediaTypeDisplayNameVideo">
				{playerData?.MediaTypeDisplayName}
			</div>
		</div>
	);
}
