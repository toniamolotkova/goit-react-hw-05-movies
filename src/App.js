import { Redirect, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppBar from "components/AppBar";
import Container from "components/Container";
import { ToastContainer } from "react-toastify";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomePage = lazy(() =>
  import("./views/HomePage/HomePage.js" /* webpackChunkName: "home-page"*/)
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPage/MoviesPage.js" /* webpackChunkName: "movie-page"*/)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage/MovieDetailsPage.js" /* webpackChunkName: "movie-details-page"*/
  )
);

export default function App() {
  return (
    <>
      <Container>
        <AppBar />
        <Suspense
          fallback={
            <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
          }
        >
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/movies" exact>
              <MoviesPage />
            </Route>
            <Route path="/movies/:slug">
              <MovieDetailsPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Container>
      <ToastContainer />
    </>
  );
}
