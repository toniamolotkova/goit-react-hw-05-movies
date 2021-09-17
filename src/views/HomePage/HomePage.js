import s from "./HomePage.module.css";
import { fetchPopMovies } from "services/movie-api";
import { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import slugify from "slugify";

const makeSlug = (string) => slugify(string, { lower: true });

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const location = useLocation();

  const observRef = useRef(null);
  const callbackFunction = ([entries]) => {
    if (!entries.isIntersecting) return;

    fetchPopMovies(page).then((res) => {
      setMovies((prevMovies) => [...prevMovies, ...res.results]);
      setPage(page + 1);
    });
  };

  const options = {
    root: null,
    threshold: 1.0,
  };

  useEffect(() => {
    if (!movies) return;
    fetchPopMovies(1).then((response) => {
      setMovies(response.results);
      setPage(page + 1);
    });
  }, []);

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

  return (
    <>
      <ul className={s.movieList}>
        {movies.map((movie) => (
          <li className={s.movie} key={movie.id}>
            <NavLink
              to={{
                pathname: `movies/${makeSlug(`${movie.title} ${movie.id}`)}`,
                state: {
                  from: {
                    location,
                    label: "Back to pop movies",
                  },
                },
              }}
              className={s.link}
            >
              <img
                className={s.image}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`poster ${movie.title}`}
              />

              <p className={s.title}>{movie.title}</p>
            </NavLink>
          </li>
        ))}
      </ul>
      <div ref={observRef} />
    </>
  );
};

export default HomePage;
