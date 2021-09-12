import { Route, Switch } from "react-router-dom";
import AppBar from "components/AppBar";
import Container from "components/Container";
import HomePage from "components/HomePage";
import MoviesPage from "components/MoviesPage";
import MovieDetailsPage from "components/MovieDetailsPage";

export default function App() {
  return (
    <>
      <Container>
        <AppBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Container>
    </>
  );
}
