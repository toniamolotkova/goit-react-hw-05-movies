import s from "./MovieDetailsPage.module.css";
import { useState, useEffect } from "react";
import {
  useParams,
  useRouteMatch,
  Route,
  NavLink,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";

import { fetchMovieDetails } from "services/movie-api";
import { lazy, Suspense } from "react";
// import Cast from "components/Cast";
// import Reviews from "components/Reviews";

const Cast = lazy(() => import("components/Cast" /*webpackChunkName: "cast"*/));
const Reviews = lazy(() =>
  import("components/Reviews" /*webpackChunkName: "reviews" */)
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
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
              <p className={s.subText}>
                User Score: {movie.vote_average * 10}%
              </p>
              <h3 className={s.title}>Overview</h3>
              <p className={s.text}>{movie.overview}</p>
              <h3 className={s.title}>Genres</h3>
              <p className={s.text}>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
        </>
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
        <Suspense fallback={<h2 className={s.text}>Loading...</h2>}>
          <Switch>
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Switch>
        </Suspense>
      </>
    </>
  );
};

export default MovieDetailsPage;
