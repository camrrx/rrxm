import "./Header.scss";
import logo from "../../assets/rrxLogo.png";
import { Link } from "react-router-dom";
import ToggleComponent from "../../componentsBasic/Toggle/toggle";

const Header = () => {
	return (
		<div className="header-container">
			<div className="title-container">
				<Link to="/home">
					<div>
						<img className="logo-rrx-home" src={logo} alt="" />
					</div>
				</Link>
			</div>
			<div className="header-container__toggle">
				<ToggleComponent />
			</div>
		</div>
	);
};

export default Header;
