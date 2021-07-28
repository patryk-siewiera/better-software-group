import React from "react";
import Playlist from "./playlist";

export default function Player() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
			}}
		>
			<h1 style={{ flex: "0 1 auto" }}>player</h1>
			<div
				className="container"
				style={{
					flexGrow: "1",
					// display: "flex",
					// backgroundColor: "lightgray"
				}}
			>
				<Playlist />
			</div>
			<div className="player">
				{/*v == 0 &&*/ <video controls={true} />}
				{/* {v==1 && <ReactPlayer/>} 
                    https://github.com/CookPete/react-player
                */}
				{/* Load mpd file from API, then inject to react-player
				https://github.com/cookpete/react-player/search?q=mpd */}

				{/* <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" /> */}
			</div>
		</div>
	);
}
