import React from "react";
import Playlist from "./playlist";

function deb(id) {
	console.log("this is id inside player \n\n" + id);
}

export default function Player({ goToLogin, goToPlaylist, videoId }) {
	if (videoId === undefined) {
		goToLogin();
	}
	return (
		<div>
			<div className="buttonBack">
				<button onClick={goToPlaylist} className="buttongoToLogin">
					&lt;- Go Back to Playlist
				</button>
			</div>
			{console.log(videoId)}
		</div>
	);
}
