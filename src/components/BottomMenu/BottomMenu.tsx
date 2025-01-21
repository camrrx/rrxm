import "./BottomMenu.scss";
import { FaSearch, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BottomMenu = () => {
	const location = useLocation();

	return (
		<>
			<div className="bottomMenu-container">
				<Link to={"/accueil"}>
					<FaHome
						className={`icon-bottomMenu ${
							location.pathname === "/accueil" ? "active" : ""
						}`}
					/>
				</Link>
				<Link to={"/home"}>
					<FaSearch
						className={`icon-bottomMenu ${
							location.pathname === "/home" ? "active" : ""
						}`}
					/>
				</Link>
			</div>
		</>
	);
};

export default BottomMenu;
