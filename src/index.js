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

const App = React.lazy(() => import("./App"));

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
