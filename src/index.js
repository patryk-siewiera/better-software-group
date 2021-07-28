import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Player from "./player";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
} from "react-router-dom";

const App = React.lazy(() => {
	return import("./App").then(
		(App) =>
			new Promise((res) => {
				setTimeout(res, 1000, App);
			})
	);
});

ReactDOM.render(
	<React.StrictMode>
		<React.Suspense fallback={<span>Splash Screen</span>}>
			<Router>
				<App />
			</Router>
		</React.Suspense>
	</React.StrictMode>,
	document.getElementById("root")
);
