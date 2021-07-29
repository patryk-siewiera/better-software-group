import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./playlist.css";
import { getMediaList } from "./api";

const bodyMedia = { MediaListId: 2, PageNumber: 1, PageSize: 15 };

export default function Playlist({ goBack, jwtToken }) {
	const [mediaList, setMediaList] = useState("Loading Media List...");

	function getMedia(bodyMedia, jwtToken) {
		const dataMedia = getMediaList(bodyMedia, jwtToken);
		return dataMedia;
	}

	function iterateObject(obj) {
		return <div>{JSON.stringify(obj.Entities[0])}</div>;
	}

	useEffect(() => {
		if (jwtToken === "") {
			goBack();
		} else {
			getMedia(bodyMedia, jwtToken).then((res) => {
				console.log(res);
				setMediaList(res);
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
			<div className="getMediaList">{JSON.stringify(mediaList)}</div>
		</div>
	);
}
