import "./Accueil.scss";
import {
	getTopRatedMovies,
	getNowPlayingMovies,
	getUpComingMovies,
} from "../../API/tmdbApi";
import { useEffect, useState } from "react";
import { RadioGroupBasic } from "../../componentsBasic/RadioGroup/RadioGroup";

// Définition des types pour les films et leurs détails
export interface Movie {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	overview: string;
}

const Accueil = () => {
	// États typés
	const [moviesToDisplay, setMoviesToDisplay] = useState<Movie[] | null>(null);
	const [movieClicked, setMovieClicked] = useState<Movie | null>(null);
	const [selectedTab, setSelectedTab] = useState<string>("value1");

	const getTopRatedMoviesFromTmdb = async () => {
		const movieData = await getTopRatedMovies();
		if (movieData && movieData.results) {
			setMoviesToDisplay(movieData.results);
			setMovieClicked(movieData.results[0]);
		}
	};

	const getNowPlayingMoviesFromTmdb = async () => {
		const movieData = await getNowPlayingMovies();
		if (movieData && movieData.results) {
			setMoviesToDisplay(movieData.results);
			setMovieClicked(movieData.results[0]);
		}
	};

	const getUpComingMoviesFromTmdb = async () => {
		const movieData = await getUpComingMovies();
		if (movieData && movieData.results) {
			setMoviesToDisplay(movieData.results);
			setMovieClicked(movieData.results[0]);
		}
	};

	useEffect(() => {
		switch (selectedTab) {
			case "value1":
				getUpComingMoviesFromTmdb();
				break;
			case "value2":
				getNowPlayingMoviesFromTmdb();
				break;
			case "value3":
				getTopRatedMoviesFromTmdb();
				break;
			default:
				break;
		}
	}, [selectedTab]);

	const getMovieClicked = (movie: Movie) => {
		setMovieClicked(movie);
	};

	return (
		<div className="accueil-container">
			<div className="title-container">
				<RadioGroupBasic
					onValueChange={(newValue: string) => setSelectedTab(newValue)}
				/>
			</div>
			<div className="cards-popular-movies">
				{moviesToDisplay &&
					moviesToDisplay.map(movie => (
						<div
							className="cards-popular-movies__card"
							key={movie.id}
							onClick={() => getMovieClicked(movie)}>
							<img
								className="cards-popular-movies__card__poster-path"
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								alt={movie.title}
							/>
						</div>
					))}
			</div>
			<div>
				{movieClicked && (
					<div className="cards-popular-movies__description">
						<img
							className="cards-popular-movies__description__img"
							src={`https://image.tmdb.org/t/p/original/${movieClicked.backdrop_path}`}
							alt={movieClicked.title}
						/>
						<div className="cards-popular-movies__description__overview">
							<h2 className="cards-popular-movies__description__overview__title">
								{movieClicked.title.toUpperCase()}
							</h2>
							<h3 className="cards-popular-movies__description__overview__releasedate">
								{movieClicked.release_date}
							</h3>
							<h4 className="cards-popular-movies__description__overview__text">
								{movieClicked.overview}
							</h4>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Accueil;
