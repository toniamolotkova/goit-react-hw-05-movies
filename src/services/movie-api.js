import axios from "axios";
const ACCESS_KEY = "d21e18c71d2f86b19fe5c8fd7277a288";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopMovies = () => {
  return axios
    .get(`${BASE_URL}/trending/movie/day?api_key=${ACCESS_KEY}`)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.length !== 0) {
          return response.data.results;
        }
      }
      if (response.status === 404) {
        throw new Error(response.message || "Movies are not found");
      }
    });
};

export const fetchMovieBySearch = (query) => {
  return axios
    .get(
      `${BASE_URL}/search/movie?api_key=${ACCESS_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
    )
    .then((response) => {
      if (response.status === 200) {
        if (response.data.length !== 0) {
          return response.data.results;
        }
      }
      if (response.status === 404) {
        throw new Error(response.message || "Your query is not find");
      }
    });
};

export const fetchMovieDetails = (movieId) => {
  return axios
    .get(`${BASE_URL}/movie/${movieId}?api_key=${ACCESS_KEY}&language=en-US`)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.length !== 0) {
          return response.data;
        }
      }
      if (response.status === 404) {
        throw new Error(response.message || "Your query is not find");
      }
    });
};

export const fetchMovieCast = (movieId) => {
  return axios
    .get(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${ACCESS_KEY}&language=en-US`
    )
    .then((response) => {
      if (response.status === 200) {
        if (response.data.length !== 0) {
          return response.data.cast;
        }
      }
      if (response.status === 404) {
        throw new Error(response.message || "Your query is not find");
      }
    });
};

// async function fetchWithErrorHandling(url = "", config = {}) {
//   const response = await fetch(url, config);
//   return response.ok
//     ? await response.json()
//     : Promise.reject(new Error("Not found"));
// }

// export function fetchPopMovies() {
//   return fetchWithErrorHandling(
//     `${BASE_URL}/trending/movie/day?api_key=${ACCESS_KEY}`
//   );
// }
