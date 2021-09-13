import s from "./MoviesPage.module.css";
import { useState, useEffect } from "react";
import SearchForm from "components/SearchForm";
import { fetchMovieBySearch } from "services/movie-api";
import { NavLink, useRouteMatch, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MoviesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState(null);

  const { url } = useRouteMatch();
  const location = useLocation();
  //const [page, setPage] = useState(1);
  useEffect(() => {
    if (!searchValue) return;
    fetchMovieBySearch(searchValue).then((res) => {
      if (res.results.length === 0) {
        toast.error(`Can't find ${searchValue}. Sorry(`);
        return;
      }
      setMovies(res.results);
    });
  }, [searchValue]);

  const handleFormSubmit = (searchValue) => {
    setSearchValue(searchValue);
  };

  return (
    <>
      <SearchForm onSubmit={handleFormSubmit} />
      {movies && (
        <ul className={s.movieList}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <NavLink
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: {
                    from: {
                      location,
                      label: "Back to the search",
                    },
                  },
                }}
                className={s.link}
              >
                <img
                  className={s.image}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                  }
                  alt={`poster ${movie.title}`}
                />

                <p className={s.title}>{movie.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;
