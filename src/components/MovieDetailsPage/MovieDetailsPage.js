import s from "./MovieDetailsPage.module.css";
import { useState, useEffect } from "react";
import { useParams, useRouteMatch, Route, NavLink } from "react-router-dom";

import { fetchMovieDetails } from "services/movie-api";
import Cast from "components/Cast";
import Reviews from "components/Reviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const { path, url } = useRouteMatch();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <div className={s.wrap}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
            }
            alt={movie.title}
            className={s.image}
          />
          <div className={s.info}>
            <h2 className={s.movieTitle}>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h2>
            <p className={s.subText}>User Score: {movie.vote_average * 10}%</p>
            <h3 className={s.title}>Overview</h3>
            <p className={s.text}>{movie.overview}</p>
            <h3 className={s.title}>Genres</h3>
            <p className={s.text}>
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      )}
      <>
        <h3 className={s.title}> Additional information:</h3>
        <ul>
          <li className={s.item}>
            <NavLink
              to={`${url}/cast`}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Cast
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink
              to={`${url}/reviews`}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Reviews
            </NavLink>
          </li>
        </ul>

        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </>
    </>
  );
};

export default MovieDetailsPage;
