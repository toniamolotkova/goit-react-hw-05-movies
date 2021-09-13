import s from "./MoviesPage.module.css";
import { useState, useEffect } from "react";
import SearchForm from "components/SearchForm";
import { fetchMovieBySearch } from "services/movie-api";
import { NavLink, useRouteMatch } from "react-router-dom";

const MoviesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState(null);

  const { url } = useRouteMatch();
  //const [page, setPage] = useState(1);
  useEffect(() => {
    if (!searchValue) return;
    fetchMovieBySearch(searchValue).then((res) => setMovies(res.results));
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
              <NavLink to={`${url}/${movie.id}`} className={s.link}>
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
