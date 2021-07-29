import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./playlist.css";
import { getMediaList } from "./api";
import { OneMovieComponent } from "./oneMovieComponent";

const bodyMedia = { MediaListId: 2, PageNumber: 1, PageSize: 15 };

export default function Playlist({ goBack, jwtToken }) {
	const [mediaList, setMediaList] = useState("Loading Media List...");
	const [dataIsLoaded, setDataIsLoaded] = useState(false);

	function getMedia(bodyMedia, jwtToken) {
		const dataMedia = getMediaList(bodyMedia, jwtToken);
		return dataMedia;
	}

	function RenderMovieDetails(isLoaded) {
		if (isLoaded) {
			let howManyMovies = mediaList.Entities.length;
			let value = mediaList.Entities[0].Title;
			return Object.entries(mediaList.Entities).map((el) => {
				return <div className="oneMovie">{el[1].Title}</div>;
			});
		} else {
			return 0;
		}
	}

	useEffect(() => {
		if (jwtToken === "") {
			setDataIsLoaded(false);
			goBack();
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
				<button onClick={goBack} className="buttonGoBack">
					Go back
				</button>
			</div>
			{/* <OneMovieComponent mediaList />
			<OneMovieComponent />
			<OneMovieComponent />
			<OneMovieComponent /> */}
			<div className="getMediaList">
				{dataIsLoaded && RenderMovieDetails(dataIsLoaded, mediaList)}
			</div>
		</div>
	);
}
