import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./playlist.css";
import { getMediaList } from "./api";
import { OneMovieComponent } from "./oneMovieComponent";

export default function Playlist({ goToLogin, goToPlayer, jwtToken }) {
	const [mediaList, setMediaList] = useState("Loading Media List...");
	const [dataIsLoaded, setDataIsLoaded] = useState(false);

	// TODO input user, media list id
	const [mediaListId, setMediaListId] = useState(3);

	const bodyMedia = { MediaListId: mediaListId, PageNumber: 1, PageSize: 15 };

	function getMedia(bodyMedia, jwtToken) {
		const dataMedia = getMediaList(bodyMedia, jwtToken);
		return dataMedia;
	}

	function onClickLog(e, id) {
		goToPlayer(id);
	}

	function RenderMovieDetails(isLoaded) {
		if (isLoaded) {
			return Object.entries(mediaList.Entities).map((el) => {
				return (
					<div
						className="oneMovie"
						onClick={(e) => onClickLog(e, el[1].Id)}
					>
						{el[1].Title}
						<br />
						{el[1].Id}
					</div>
				);
			});
		} else {
			return 0;
		}
	}

	useEffect(() => {
		if (jwtToken === "") {
			setDataIsLoaded(false);
			goToLogin();
		} else {
			getMedia(bodyMedia, jwtToken).then((res) => {
				setMediaList(res);
				setDataIsLoaded(true);
			});
		}
	}, [jwtToken]);

	return (
		<div>
			<div className="buttonBack">
				<button onClick={goToLogin} className="buttongoToLogin">
					&lt;- Go back to Login Page
				</button>
			</div>
			<div className="getMediaList">
				{dataIsLoaded && RenderMovieDetails(dataIsLoaded, mediaList)}
			</div>
		</div>
	);
}
