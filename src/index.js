import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Player from "./player";

ReactDOM.render(
	<React.StrictMode>
		<Player />
		{/* <App /> */}
	</React.StrictMode>,
	document.getElementById("root")
);
