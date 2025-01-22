import React, { useEffect, useState } from "react";
import "./movieModal.scss";
import { getMovieCredits, getMovieDetails } from "../../API/tmdbApi";
import silhouette from "../../assets/silhouette.png";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

interface MovieNoteProps {
	movie_id?: number;
	title_movie: string | null;
}

interface CastMember {
	id: number;
	name: string;
	character: string;
	profile_path?: string;
}

interface MovieDetails {
	title: string;
	genres?: { id: number; name: string }[];
	overview?: string;
	backdrop_path?: string;
}

const MovieNote: React.FC<MovieNoteProps> = props => {
	const [castMovie, setCastMovie] = useState<CastMember[]>([]);
	const [detailsMovie, setDetailsMovie] = useState<MovieDetails | null>(null);

	useEffect(() => {
		if (props.movie_id) {
			getCastMovie(props.movie_id);
			getDetailsMovie(props.movie_id);
		}
	}, [props.movie_id]);

	/* Get the casting of the movie and set it into a state */
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

	/* Choose if we'll display the actor or the character depending on a click action */
	const actorOrCharacter = (person: CastMember) => {
		const element = document.getElementById(`actor-card-${person.id}`);
		if (element) {
			element.innerHTML =
				element.innerHTML === person.name ? person.character : person.name;
		}
	};

	/* Display the card of the actors and manage if we display the actor or the character by clicking on it */
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

	/* Get the details of the movie and set it into a state */
	const getDetailsMovie = async (idMovie: number) => {
		const details = await getMovieDetails(idMovie);
		setDetailsMovie(details);
	};

	return (
		<div id="modal-container-id" className="modal-container">
			<div className="background-modal-overlay"></div>
			<div className="background-modal">
				<img
					src={
						detailsMovie?.backdrop_path
							? `https://image.tmdb.org/t/p/w500/${detailsMovie.backdrop_path}`
							: ""
					}
					alt="Movie backdrop"
				/>
			</div>
			<div className="info-container">
				<div id="button-container-id" className="button-container">
					<Link
						to={
							props.title_movie
								? `/search?titleMovie=${props.title_movie}`
								: "/profile"
						}>
						<ImCross className="button-close" />
					</Link>
				</div>
				<div className="movie-and-genre-container">
					<div id="title-movie-id" className="title-movie-container">
						{detailsMovie?.title}
					</div>
					<div className="genre-container">
						{detailsMovie?.genres?.map(genre => (
							<div key={genre.id} className="details-movie-genre">
								{genre.name}
							</div>
						))}
					</div>
				</div>
				<div className="description-container">
					{detailsMovie?.overview ? (
						<p>{detailsMovie.overview}</p>
					) : (
						<p>This movie does not have any description</p>
					)}
				</div>
				<div className="actor-card-container">
					<div className="casting-movie-container">{displayActorCard()}</div>
				</div>
			</div>
		</div>
	);
};

export default MovieNote;
