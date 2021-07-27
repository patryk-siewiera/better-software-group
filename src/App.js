import "./App.css";

function App() {
	function handleLogin() {
		// history.push('/home')
	}
	return (
		<div className="App">
			<form action="" onSubmit={handleLogin}>
				<input type="text" />
				<input type="text" />
			</form>
		</div>
	);
}

export default App;
