import "./oneMovieComponent.css";
import React from "react";

export function OneMovieComponent({ data }) {
	return (
		<div>
			<div className="el">one movie component</div>
			<div>{console.log(data)}</div>
		</div>
	);
}
