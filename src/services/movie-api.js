import axios from "axios";
const ACCESS_KEY = "d21e18c71d2f86b19fe5c8fd7277a288";
const BASE_URL = "https://api.themoviedb.org/3";

function fetchWithErrorHandling(url = "") {
  return axios
    .get(`${url}`)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.length !== 0) {
          return response.data;
        }
      }
    })
    .catch((error) => error.message || "Your query is not find");
}

export function fetchPopMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${ACCESS_KEY}`
  );
}

export function fetchMovieBySearch(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${ACCESS_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
  );
}

export function fetchMovieDetails(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${ACCESS_KEY}&language=en-US`
  );
}

export function fetchMovieCast(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${ACCESS_KEY}&language=en-US`
  );
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${ACCESS_KEY}&language=en-US`
  );
}
