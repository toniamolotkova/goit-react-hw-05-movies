import s from "./MoviesPage.module.css";
import { useState, useEffect, useRef } from "react";
import SearchForm from "components/SearchForm";
import { fetchMovieBySearch } from "services/movie-api";
import { NavLink, useRouteMatch, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from "slugify";

const makeSlug = (string) => slugify(string, { lower: true });

const MoviesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

  const { url } = useRouteMatch();
  const location = useLocation();

  const observRef = useRef(null);
  const callbackFunction = ([entries]) => {
    if (!entries.isIntersecting) return;

    fetchMovieBySearch(searchValue, page).then((res) => {
      if (res.results.length === 0) {
        toast.error(`Can't find ${searchValue}. Sorry(`);
        return;
      }
      setMovies((prevMovies) => [...prevMovies, ...res.results]);
      setPage(page + 1);
    });
  };

  const options = {
    root: null,
    threshold: 1.0,
  };

  useEffect(() => {
    if (!searchValue) return;
    fetchMovieBySearch(searchValue, page).then((res) => {
      if (res.results.length === 0) {
        toast.error(`Can't find ${searchValue}. Sorry(`);
        return;
      }
      setMovies(res.results);
      setPage(page + 1);
    });
  }, [searchValue]);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (observRef.current) observer.observe(observRef.current);

    const currentObsRef = observRef.current;
    return () => {
      if (currentObsRef) {
        observer.unobserve(currentObsRef);
      }
    };
  }, [observRef, options]);

  const handleFormSubmit = (searchValue) => {
    setSearchValue(searchValue);
  };

  return (
    <>
      <SearchForm onSubmit={handleFormSubmit} />
      {movies && (
        <>
          <ul className={s.movieList}>
            {movies.map((movie) => (
              <li key={movie.id}>
                <NavLink
                  to={{
                    pathname: `${url}/${makeSlug(
                      `${movie.title} ${movie.id}`
                    )}`,
                    state: {
                      from: {
                        label: "Back to search",
                        location,
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
          <div ref={observRef} />
        </>
      )}
    </>
  );
};

export default MoviesPage;
