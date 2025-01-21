import "./Dropdown.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";

const Dropdown = (dropdownTrigger, submenu) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>{dropdownTrigger}</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content>
					{submenu.map(item => (
						<Link to={item.path}>
							<DropdownMenu.Item>
								<div onClick={submenu.action ?? undefined}>{item.title}</div>
							</DropdownMenu.Item>
						</Link>
					))}

					<DropdownMenu.Arrow />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};

export default Dropdown;
