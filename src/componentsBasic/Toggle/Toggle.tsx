import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { FaSearch, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Toggle.scss";

const ToggleComponent = () => {
	const location = useLocation();

	return (
		<ToggleGroup.Root
			type="single"
			className="toggle-group-container"
			defaultValue="center"
			aria-label="Text alignment">
			<ToggleGroup.Item value="left" aria-label="Left aligned">
				<Link to={"/accueil"}>
					<FaHome
						className={`icon-bottomMenu ${
							location.pathname === "/accueil" ? "active" : ""
						}`}
					/>
				</Link>
			</ToggleGroup.Item>
			<ToggleGroup.Item value="center" aria-label="Center aligned">
				<Link to={"/home"}>
					<FaSearch
						className={`icon-bottomMenu ${
							location.pathname === "/home" ? "active" : ""
						}`}
					/>
				</Link>
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	);
};

export default ToggleComponent;
