import s from "./MovieDetailsPage.module.css";
import { useState, useEffect } from "react";
import { useParams, useRouteMatch, Route } from "react-router-dom";

import { fetchMovieDetails } from "services/movie-api";
import Cast from "components/Cast";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const { path } = useRouteMatch();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <div className={s.wrap}>
          <img
            src={
              `https://image.tmdb.org/t/p/w500/${movie.poster_path}` ??
              `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
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
        <h3 className={s.title}> Additional information</h3>

        <Route path={`${path}`}>
          <Cast />
        </Route>
      </>
    </>
  );
};

export default MovieDetailsPage;
