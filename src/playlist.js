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
					<div className="divImage">
						<img
							src={element.Images[index].Url}
							alt="miniatureImage"
							className="miniatureImage"
						/>
					</div>
				);
			}
		}
		console.log(element.Images.length);
		return <div>test</div>;
	}

	function secondsToHms(d) {
		d = Number(d);
		// I divided here by 1000, because typical movie lenght is between 50 - 300 minutes, just guessing
		d = d / 1000;
		let h = Math.floor(d / 3600);
		let m = Math.floor((d % 3600) / 60);
		let s = Math.floor((d % 3600) % 60);

		let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
		let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
		let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
		return hDisplay + mDisplay + sDisplay;
	}

	function RenderMovieDetails(isLoaded) {
		if (isLoaded) {
			return Object.entries(mediaList.Entities).map((el) => {
				// TODO <br /> should be removed
				return (
					<div
						className="oneMovie"
						onClick={(e) => onClickLog(e, el[1].Id)}
					>
						<div>
							<div className="detailsTitle">{el[1].Title}</div>
							<div className="detailsDuration">
								{secondsToHms(el[1].Duration)}
							</div>
							<div className="detailsMediaType">
								{el[1].MediaTypeDisplayName}
							</div>
						</div>
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
