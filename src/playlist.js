import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./playlist.css";
import { getMediaList } from "./api";

const bodyMedia = { MediaListId: 2, PageNumber: 1, PageSize: 15 };

export default function Playlist({ goBack, jwtToken }) {
	const [mediaList, setMediaList] = useState("");

	function getMedia(bodyMedia, jwtToken) {
		const dataMedia = getMediaList(bodyMedia, jwtToken);
		dataMedia.then((res) => {
			setMediaList(res);
		});
	}

	useEffect(() => {
		getMedia(bodyMedia, jwtToken);
	}, []);

	useEffect(() => {
		if (jwtToken === "") {
			goBack();
		}
	}, [jwtToken]);

	return (
		<div>
			<div className="buttonBack">
				<button onClick={goBack} className="buttonGoBack">
					Go back
				</button>
			</div>
			<div className="getMediaList">
				{/* if not && replacer */}
				{JSON.stringify(mediaList, null, 2)}
			</div>
		</div>
	);
}
