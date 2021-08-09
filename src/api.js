import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "cdd485388f6b9eae7296788f2785dd35",
        language: "en-US",
    },
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: (id) =>
        api.get(`movie/${id}`, {
            params: {
                append_to_response: "videos",
            },
        }),
    search: (term) =>
        api.get("search/movie", {
            params: {
                query: encodeURIComponent(term),
            },
        }),
};

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: (id) =>
        api.get(`tv/${id}`, {
            params: {
                append_to_response: "videos",
            },
        }),
    search: (term) =>
        api.get("search/tv", {
            params: {
                query: encodeURIComponent(term),
            },
        }),
};
// https://developers.themoviedb.org/3/movies/get-popular-movies
// cdd485388f6b9eae7296788f2785dd35
