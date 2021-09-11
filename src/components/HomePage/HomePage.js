import s from "./HomePage.module.css";
import fetchPopMovies from "services/movie-api";
import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch(0);

  useEffect(() => {
    if (!movies) return;
    fetchPopMovies().then((response) => setMovies(response));
  }, []);

  return (
    <ul className={s.movieList}>
      {movies.map((movie) => (
        <li className={s.movie} key={movie.id}>
          <Link to={`${url}/${movie.id}`} className={s.link}>
            <img
              className={s.image}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`poster ${movie.title}`}
            />

            <p className={s.title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
