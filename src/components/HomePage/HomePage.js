import s from "./HomePage.module.css";
import { fetchPopMovies } from "services/movie-api";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  //const { url } = useRouteMatch();
  const location = useLocation();
  useEffect(() => {
    if (!movies) return;
    fetchPopMovies().then((response) => setMovies(response.results));
  }, []);

  return (
    <ul className={s.movieList}>
      {movies.map((movie) => (
        <li className={s.movie} key={movie.id}>
          <NavLink
            to={{
              pathname: `movies/${movie.id}`,
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
  );
};

export default HomePage;
