import "./Header.scss";
import logo from "../../assets/rrxLogo.png";
import { Link } from "react-router-dom";

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
		</div>
	);
};

export default Header;
