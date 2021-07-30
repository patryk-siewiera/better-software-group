import React, { useEffect, useState } from "react";
import { getMediaList } from "./api";
import "./playlist.css";

export default function Playlist({
	goToLogin,
	goToPlayer,
	jwtToken,
	pageNumberHandler,
	goToPage,
	mediaListIdPlaylist,
}) {
	const [mediaList, setMediaList] = useState("Loading Media List...");
	const [dataIsLoaded, setDataIsLoaded] = useState(false);
	const [totalCountMovies, setTotalCountMovies] = useState(1);

	useEffect(() => {
		if (jwtToken === "") {
			setDataIsLoaded(false);
			goToLogin();
		} else {
			getMedia(bodyMedia, jwtToken).then((res) => {
				if (res === undefined) {
					alert("Wrong Media List Id, please select another");
					goToLogin();
				} else {
					setMediaList(res);
					setTotalCountMovies(res.TotalCount);
					setDataIsLoaded(true);
				}
			});
		}
	}, [jwtToken]);

	const bodyMedia = {
		MediaListId: mediaListIdPlaylist,
		PageNumber: pageNumberHandler,
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
		return <div className="textWithout">without image</div>;
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
			return <div>loading</div>;
		}
	}

	function pagination() {
		const itemsPerPage = 15;
		const pagesCount = Math.floor(totalCountMovies / itemsPerPage) + 1;
		const arr = [...Array(pagesCount).keys()].map((i) => i + 1);
		return arr.map((e) => (
			<button
				className="paginationButtons"
				onClick={() => alert("pagination will be implemented soon")}
			>
				{e}
			</button>
		));
	}

	return (
		<div>
			<div className="buttonBack">
				<button onClick={goToLogin} className="buttongoToLogin">
					&lt;- Go back to Login Page
				</button>
			</div>
			<div className="totalPages">pages: {pagination()}</div>
			<div className="getMediaList">
				{dataIsLoaded && RenderMovieDetails(dataIsLoaded, mediaList)}
			</div>
		</div>
	);
}
