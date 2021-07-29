import "./oneMovieComponent.css";
import React from "react";

function parseData() {
	debugger;
	return 0;
}

export function OneMovieComponent({ data }) {
	return (
		<div>
			<div className="el">one movie component</div>
			<div>{console.log(data)}</div>
			{/* {parseData()} */}
		</div>
	);
}
