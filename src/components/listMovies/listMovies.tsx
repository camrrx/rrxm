import React, { useEffect, useState } from "react";
import "./listMovies.scss";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MovieNote from "../movieModal/movieModal";

// Définition des types pour les props et les états
interface Movie {
	id: number;
	title: string;
	poster_path: string;
}

interface ListMoviesProps {
	moviesParam: Movie[];
}

export const ListMovies: React.FC<ListMoviesProps> = props => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const title_movie = new URLSearchParams(useLocation().search).get(
		"titleMovie"
	);
	const movie_id = new URLSearchParams(useLocation().search).get("movie_id");

	const dispatch = useDispatch();

	useEffect(() => {
		setMovies(props.moviesParam);

		// Si un film est sélectionné (modal affichée), on désactive le scroll
		if (movie_id) {
			document.getElementsByTagName("body")[0].style.overflow = "hidden";
			document.getElementById("listMovies")!.style.overflow = "no-scroll";
		} else {
			document.getElementsByTagName("body")[0].style.overflow = "auto";
			document.getElementById("listMovies")!.style.overflow = "auto";
		}
	}, [props.moviesParam, movie_id]);

	// Filtre les films avec une image de couverture
	const filmCover = (): Movie[] => {
		return movies.filter(movie => movie.poster_path);
	};

	return (
		<div>
			<div className="movies-list" id="listMovies">
				{movies.length ? (
					filmCover().map(movie => (
						<Link
							key={movie.id}
							to={`/search?titleMovie=${title_movie}&movie_id=${movie.id}`}>
							<div className="card">
								<div className="poster-container">
									<img
										className="poster-path"
										src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
										alt={movie.title}
									/>
								</div>
								<div className="card-body">
									<button
										onClick={() => {
											// On click, store the selected movie and display modal to rate
											dispatch({
												type: "movieSelected/addMovie",
												payload: movie,
											});
										}}
										className="button-select">
										{movie.title}
									</button>
								</div>
							</div>
						</Link>
					))
				) : (
					<p>No movie available...</p>
				)}
			</div>
			{
				//If isDisplay is true, display the MovieNote component related to the movie selected
				movie_id ? (
					<div className="movie-note">
						<MovieNote
							movie_id={Number(movie_id)}
							title_movie={title_movie}></MovieNote>
					</div>
				) : (
					""
				)
			}
		</div>	
	);
};

export default ListMovies;
