import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { getMovies } from "../../API/tmdbApi";
import ListMovies from "../../components/listMovies/listMovies";
import logo from "../../assets/rrxLogo.png";
import { FaSearch } from "react-icons/fa";

import "./search.scss";
import { Link, useLocation } from "react-router-dom";

interface Movie {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	overview: string;
}

const Search = () => {
	// useState avec types
	const [researchingMovie, setResearchingMovie] = useState<string>("");
	const title_movie = new URLSearchParams(useLocation().search).get(
		"titleMovie"
	);
	const [allMovies, setAllMovies] = useState<Movie[]>([]);

	useEffect(() => {
		setResearchingMovie(title_movie || "");
		if (title_movie && title_movie.length) {
			search(title_movie);
		}
	}, [title_movie, setResearchingMovie]);

	// Handler pour mettre à jour le titre du film recherché
	const handleNewResearch = (research: ChangeEvent<HTMLInputElement>) => {
		setResearchingMovie(research.target.value);
	};

	// Fonction de recherche de films
	const search = (movie: string) => {
		getMovies(movie).then(movies => {
			setAllMovies(movies);
		});
	};

	// Fonction de recherche par touche Enter
	const searchFromKey = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			search(researchingMovie);
		}
	};

	return (
		<div className="search-container">
			<div className="header-container" id="searchContainerId">
				<Link to="/home">
					<img className="logo-rrx" src={logo} alt="" />
				</Link>
				<div className="research-zone">
					<form action="/search" className="research-zone">
						<input
							type="search"
							defaultValue={title_movie || ""}
							className="researching"
							name="titleMovie"
							autoComplete="off"
							onChange={handleNewResearch}
							onKeyPress={e => searchFromKey(e)}
						/>
						<Link
							to={"/search?titleMovie=" + researchingMovie}
							className="search-button noSelect"
							onClick={() => {
								search(researchingMovie);
							}}>
							<FaSearch className="icons" />
						</Link>
					</form>
				</div>
				<div />
			</div>

			<div>
				<ListMovies moviesParam={allMovies ? allMovies : []} />
			</div>
		</div>
	);
};

export default Search;
