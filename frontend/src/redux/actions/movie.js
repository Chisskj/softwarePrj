import http from "../../helpers/http";

export const movie = (title) => {
	return async (dispatch) => {
		const params = new URLSearchParams();
		params.append("title", title);
		try {
			dispatch({
				type: "SET_CREATE_MOVIE_MESSAGE",
				payload: "",
			});
			const results = await http(this.props.auth.token).post(`movies`, params);
			localStorage.setItem("token", results.data.token);
			dispatch({
				type: "CREATE_MOVIE",
				payload: results.data.token,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: "SET_CREATE_MOVIE_MESSAGE",
				payload: message,
			});
		}
	};
};

export const getAllMovie = () => {
	return async (dispatch) => {
		const response = await http().get(`movies`);
		dispatch({
			type: "GET_ALL_MOVIE",
			payload: response.data.results,
		});
		dispatch({
			type: "TOGGLE_MOVIE_LOADING",
		});
	};
};

export const getMovieDetail = (id) => {
	return async (dispatch) => {
		const response = await http().get(`movies/${id}`);
		dispatch({
			type: "GET_MOVIE_DETAIL",
			payload: response.data.results,
		});
		dispatch({
			type: "TOGGLE_MOVIE_LOADING",
		});
	};
};

export const getMovieDetailByTitle = (title) => {
	console.log("GETMOVIEBYTITLE", title)
	return async (dispatch) => {
		const response = await http().get(`movies/13?title=${title}`);
		dispatch({
			type: "GET_MOVIE_DETAIL_BY_TITLE",
			payload: response.data.results,
		});
		dispatch({
			type: "TOGGLE_MOVIE_LOADING",
		});
	};
};

export const getMovieByGenres = (id) => {
	return async (dispatch) => {
		const response = await http().get(`list_genres/${id}`);
		// console.log("responseresponseresponse: ", response.data.results)
		dispatch({
			type: "GET_MOVIE_BY_GENRES",
			payload: response.data.results,
		});
		dispatch({
			type: "TOGGLE_CART_LOADING",
		});
	};
};

export const createMovie = (id, data) => {
	console.log("MOVIEE:", data)
	return async (dispatch) => {
		const response = await http().post(`movies/${id}`, data);
		dispatch({
			type: "TOGGLE_MOVIE_UPDATE",
		});
	};
};
export const deleteMovieByID = (id) => {
	return async (dispatch) => {
		await http().delete(`movies/${id}`);
		dispatch({
			type: "TOGGLE_MOVIE_DELETE",
		});
	};
};
export const updateMovieByID = (id, data) => {
	console.log("MOVIEE:", data)
	return async (dispatch) => {
		const response = await http().patch(`movies/${id}`, data);
		dispatch({
			type: "TOGGLE_MOVIE_UPDATE",
		});
	};
};