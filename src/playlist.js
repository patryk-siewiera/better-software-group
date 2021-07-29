import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./playlist.css";
import { getMediaList } from "./api";
import { OneMovieComponent } from "./oneMovieComponent";

export default function Playlist({ goToLogin, goToPlayer, jwtToken }) {
	const [mediaList, setMediaList] = useState("Loading Media List...");
	const [dataIsLoaded, setDataIsLoaded] = useState(false);

	// TODO input user, media list id
	const [mediaListId, setMediaListId] = useState(2);
	const [pageNumber, setPageNumber] = useState(1);
	// const [mediaListId, setMediaListId] = useState(2);

	const bodyMedia = {
		MediaListId: mediaListId,
		PageNumber: pageNumber,
		PageSize: 15,
		IncludeImages: true,
	};

	function getMedia(bodyMedia, jwtToken) {
		const dataMedia = getMediaList(bodyMedia, jwtToken);
		return dataMedia;
	}

	function onClickLog(e, id) {
		goToPlayer(id);
	}

	// TODO finish implementing miniature picture
	function returnImage(element) {
		for (let index = 0; index < element.Images.length; index++) {
			if (element.Images[index].ImageTypeCode === "FRAME") {
				return (
					<img
						src={element.Images[index].Url}
						alt="miniatureImage"
						className="miniatureImage"
					/>
				);
			}
		}
		console.log(element.Images.length);
		return <div>test</div>;
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
						{returnImage(el[1])}
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
