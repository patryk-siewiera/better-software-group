import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router
} from "react-router-dom";
import "./index.css";

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
			<div className="splash">Loading... (timeout 1s)</div>
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
