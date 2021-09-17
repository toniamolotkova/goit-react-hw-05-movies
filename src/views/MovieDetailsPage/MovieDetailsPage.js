import s from "./MovieDetailsPage.module.css";
import { useState, useEffect, Suspense, lazy } from "react";
import {
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";

import { fetchMovieDetails } from "services/movie-api";
import MovieCard from "components/MovieCard";
//import AdditionalMovieInfo from "components/AdditionalMovieInfo";

const Cast = lazy(() => import("components/Cast" /*webpackChunkName: "cast"*/));
const Reviews = lazy(() =>
  import("components/Reviews" /*webpackChunkName: "reviews" */)
);

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
      {/* <AdditionalMovieInfo movieId={movieId} path={path} url={url}/> query={location?.state?.from}*/}

      <h3 className={s.title}> Additional information:</h3>
      <ul>
        <li className={s.item}>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: {
                from: location?.state?.from,
              },
            }}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Cast
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: location?.state?.from,
              },
            }}
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
            <Cast movieId={movieId} />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
