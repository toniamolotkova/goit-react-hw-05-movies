import s from "./MovieDetailsPage.module.css";
import { useState, useEffect } from "react";
import {
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";

import { fetchMovieDetails } from "services/movie-api";
import MovieCard from "components/MovieCard";
import AdditionalMovieInfo from "components/AdditionalMovieInfo";

const MovieDetailsPage = () => {
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [movie, setMovie] = useState(null);

  const { path, url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? "/");
  };

  return (
    <>
      {movie && (
        <>
          <button className={s.btn} type="button" onClick={onGoBack}>
            {location?.state?.from?.label ?? "Back to movies"}
          </button>
          <MovieCard movie={movie} />
        </>
      )}
      <AdditionalMovieInfo movieId={movieId} path={path} url={url} />
    </>
  );
};

export default MovieDetailsPage;
