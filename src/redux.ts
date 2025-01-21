import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type pour l'état de `movieSelectedSlice`
interface Movie {
	title?: string;
	description?: string;
	[key: string]: unknown;
}

// Type pour l'état initial de `movieSelectedSlice`
type MovieState = Movie | object;

// Slice pour sélectionner un film
const movieSelectedSlice = createSlice({
	name: "movieSelected",
	initialState: {} as MovieState,
	reducers: {
		addMovie: (state, action: PayloadAction<Movie>) => {
			return action.payload;
		},
		removeMovie: () => {
			return {};
		},
	},
});

// Slice pour afficher ou masquer le modal
const displayMovieRatingSlice = createSlice({
	name: "isDisplay",
	initialState: false,
	reducers: {
		displayModal: () => true,
		dontDisplayModal: () => false,
	},
});

// Type pour l'état initial de `getResearchSlice`
type ResearchState = string;

// Slice pour gérer la recherche
const getResearchSlice = createSlice({
	name: "movieResearch",
	initialState: "" as ResearchState,
	reducers: {
		getMovie: (state, action: PayloadAction<{ research: string }>) => {
			return action.payload.research;
		},
	},
});

// Type pour l'état de `userLoginSlice`
interface LoginState {
	usernameLogin: string;
	successLogin: boolean;
}

// Slice pour gérer les informations de connexion de l'utilisateur
const userLoginSlice = createSlice({
	name: "loginUser",
	initialState: {
		usernameLogin: "",
		successLogin: false,
	} as LoginState,
	reducers: {
		getLoginData: (state, action: PayloadAction<LoginState>) => {
			return {
				usernameLogin: action.payload.usernameLogin,
				successLogin: action.payload.successLogin,
			};
		},
		logout: () => {
			return {
				usernameLogin: "",
				successLogin: false,
			};
		},
	},
});

// Configuration du store Redux
export const store = configureStore({
	reducer: {
		movieSelected: movieSelectedSlice.reducer,
		isDisplay: displayMovieRatingSlice.reducer,
		movieResearch: getResearchSlice.reducer,
		loginUser: userLoginSlice.reducer,
	},
});

// Types pour l'utilisation dans le store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
