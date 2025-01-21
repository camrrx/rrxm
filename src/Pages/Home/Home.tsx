//Stateless Functional Component (scf to create easily the function)
import "./Home.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "../../assets/jungleBook.jpeg";
import Header from "../../components/header/Header";
import { ChangeEvent, KeyboardEvent } from "react";
import { FaSearch } from "react-icons/fa";

const Home = () => {
	const dispatch = useDispatch();
	const [research, setResearch] = useState("");
	const navigate = useNavigate();

	const handleResearch = (event: ChangeEvent<HTMLInputElement>) => {
		setResearch(event.target.value);
	};

	const searchFromKey = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			navigate("/search?titleMovie=" + research);
		}
	};
	return (
		<div
			className="home-container"
			style={{
				backgroundImage: `url(${background})`,
			}}>
			<div className="background-home-container">
				<Header />
				<div className="search-home-container">
					<input
						placeholder="Interstellar, Avatar ..."
						id="movieSearch"
						name="titleMovie"
						className="search-input"
						autoComplete="off"
						type="text"
						onChange={handleResearch}
						onKeyPress={e => searchFromKey(e)}
						required
					/>
					<Link
						to={"/search?titleMovie=" + research}
						className="search-button noSelect"
						onClick={() => {
							//On click, the text written in the input will be store in the redux store to be used in search page
							dispatch({
								type: "movieResearch/getMovie",
								payload: { research },
							});
						}}>
						<FaSearch className="icons" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
