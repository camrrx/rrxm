/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=9952e490be27ea079da3d33dd5079f67";

const options: AxiosRequestConfig = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTUyZTQ5MGJlMjdlYTA3OWRhM2QzM2RkNTA3OWY2NyIsInN1YiI6IjYzMzM1ZTEwYTE0YmVmMDA3ZGUyYmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yfojvk4mxM86ACxiknPZs2K7lKk0gDKcxkn03OLk_vA",
	},
};

// Types
interface Movie {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	overview: string;
}

interface Credits {
	cast: Array<{ name: string; character: string }>;
	crew: Array<{ name: string; job: string }>;
	[key: string]: any;
}

interface MovieDetails {
	id: number;
	title: string;
	overview: string;
	release_date: string;
	[key: string]: any;
}

interface MoviesResponse {
	results: Movie[];
	[key: string]: any;
}

// Fonctions

export const getMovies = async (titleMovie: string): Promise<Movie[]> => {
	try {
		const res = await axios.get<MoviesResponse>(
			`${API_URL}/search/movie?language=fr-FR&query=${titleMovie}&page=1&${API_KEY}`,
			options
		);
		return res.data.results;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getMovieCredits = async (
	movie_id: number
): Promise<Credits | undefined> => {
	try {
		const res = await axios.get<Credits>(
			`${API_URL}/movie/${movie_id}/credits?${API_KEY}&language=fr-FR`,
			options
		);
		return res.data;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export const getMovieDetails = async (
	movie_id: number
): Promise<MovieDetails | null> => {
	try {
		const res = await axios.get<MovieDetails>(
			`${API_URL}/movie/${movie_id}?${API_KEY}&language=fr-FR`,
			options
		);
		return res.data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const getPopularMovies = async (): Promise<MoviesResponse | null> => {
	try {
		const res = await axios.get<MoviesResponse>(
			`${API_URL}/movie/popular?${API_KEY}&language=fr-FR`,
			options
		);
		return res.data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const getTopRatedMovies = async (): Promise<MoviesResponse | null> => {
	try {
		const res = await axios.get<MoviesResponse>(
			`${API_URL}/movie/top_rated?${API_KEY}&language=fr-FR`,
			options
		);
		return res.data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const getNowPlayingMovies = async (): Promise<MoviesResponse | null> => {
	try {
		const res = await axios.get<MoviesResponse>(
			`${API_URL}/movie/now_playing?${API_KEY}&language=fr-FR`,
			options
		);
		return res.data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const getUpComingMovies = async (): Promise<MoviesResponse | null> => {
	try {
		const res = await axios.get<MoviesResponse>(
			`${API_URL}/movie/upcoming?${API_KEY}&language=fr-FR`,
			options
		);
		return res.data;
	} catch (e) {
		console.error(e);
		return null;
	}
};
