import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import BottomMenu from "./components/BottomMenu/BottomMenu";
import Accueil from "./Pages/Accueil/Accueil";
import Search from "./Pages/Search/search";
import { Provider } from "react-redux";
import { store } from "./redux";
import React from "react";

const App = () => {
	return (
		<React.Fragment>
			<Provider store={store}>
				<Router>
					<div className="app-design">
						<Routes>
							<Route path="/home" element={<Home />} />
							<Route path="/accueil" element={<Accueil />} />
							<Route path="/search" element={<Search />} />
						</Routes>
					</div>
					<div className="bottom-menu">
						<BottomMenu />
					</div>
				</Router>
			</Provider>
		</React.Fragment>
	);
};

export default App;
