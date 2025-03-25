import "./Accueil.scss";
import {
	getTopRatedMovies,
	getNowPlayingMovies,
	getUpComingMovies,
	getMovieCredits,
} from "../../API/tmdbApi";
import { useEffect, useState } from "react";
import { RadioGroupBasic } from "../../componentsBasic/RadioGroup/RadioGroup";
import silhouette from "../../assets/silhouette.png";
import Header from "../../components/header/Header";

// Définition des types pour les films et leurs détails
export interface Movie {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	overview: string;
}
interface CastMember {
	id: number;
	name: string;
	character: string;
	profile_path?: string;
}

const Accueil = () => {
	const [moviesToDisplay, setMoviesToDisplay] = useState<Movie[] | null>(null);
	const [movieClicked, setMovieClicked] = useState<Movie | null>(null);
	const [selectedTab, setSelectedTab] = useState<string>("value1");
	const [castMovie, setCastMovie] = useState<CastMember[]>([]);

	useEffect(() => {
		if (movieClicked?.id) {
			getCastMovie(movieClicked.id);
		}
	}, [movieClicked]);

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

	const getCastMovie = async (idMovie: number) => {
		const casting = await getMovieCredits(idMovie);
		if (casting) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const castWithId = casting.cast.map((member: any, index: number) => ({
				id: member.id || index,
				name: member.name,
				character: member.character,
				profile_path: member.profile_path,
			}));
			setCastMovie(castWithId);
		}
	};

	/*Choose if we'll display the actor or the character depending on a click action*/
	const actorOrCharacter = (person: CastMember) => {
		const element = document.getElementById("actor-card-" + person.id);
		let res;
		if (element) {
			if (element.innerHTML === person.name) {
				res = person.character;
			} else {
				res = person.name;
			}
		}
		if (element && typeof res === "string") {
			element.innerHTML = res;
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

	const displayActorCard = () => {
		return castMovie.map(person => (
			<div key={person.id}>
				<div className="casting-container">
					<div className="casting-img">
						<img
							src={
								person.profile_path
									? `https://image.tmdb.org/t/p/w780${person.profile_path}`
									: silhouette
							}
							alt={person.name}
						/>
					</div>
					<div className="casting-actor-container">
						<div
							id={`actor-card-${person.id}`}
							className="casting-actor-div"
							onClick={() => actorOrCharacter(person)}>
							{person.name}
						</div>
					</div>
				</div>
			</div>
		));
	};

	return (
		<div className="accueil-container">
			<Header />
			<div className="title-container">
				<RadioGroupBasic
					onValueChange={(newValue: string) => setSelectedTab(newValue)}
				/>
			</div>
			<div className="cards-popular-movies-container">
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
							<div className="actor-card-container">{displayActorCard()}</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Accueil;
