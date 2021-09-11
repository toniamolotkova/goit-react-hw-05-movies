import axios from "axios";
const ACCESS_KEY = "d21e18c71d2f86b19fe5c8fd7277a288";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchPopMovies = () => {
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

export default fetchPopMovies;

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
