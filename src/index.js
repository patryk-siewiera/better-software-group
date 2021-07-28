import React, { useState, useEffect, lazy } from "react";
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

function fallbackTimeout() {
	return (
		<>
			<div className="splash">Splash Screen (timeout 1s)</div>
		</>
	);
}

function MainApp() {
	ReactDOM.render(
		<React.StrictMode>
			<React.Suspense fallback={fallbackTimeout()}>
				<Router>
					<App />
				</Router>
			</React.Suspense>
		</React.StrictMode>,
		document.getElementById("root")
	);
}

MainApp();
