import s from "./AdditionalMovieInfo.module.css";
import { NavLink, Route, Switch, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import PropTypes from "prop-types";

const Cast = lazy(() => import("components/Cast" /*webpackChunkName: "cast"*/));
const Reviews = lazy(() =>
  import("components/Reviews" /*webpackChunkName: "reviews" */)
);

const AdditionalMovieInfo = ({ movieId, path, url }) => {
  const location = useLocation();
  //const history = useHistory();

  const query = location?.state?.from;
  console.log(query);
  return (
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
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: query && "/",
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

AdditionalMovieInfo.propTypes = {
  movieId: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default AdditionalMovieInfo;
