import React, { useState, useEffect } from "react";
import Playlist from "./playlist";
import { getPlayer } from "./api";

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

	return (
		<div>
			<div className="buttonBack">
				<button onClick={goToPlaylist} className="buttongoToLogin">
					&lt;- Go Back to Playlist
				</button>
			</div>
			{JSON.stringify(playerData)}
		</div>
	);
}
