import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Player from "./player";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
} from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
		{/* <Player /> */}
	</React.StrictMode>,
	document.getElementById("root")
);
