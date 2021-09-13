import s from "./Cast.module.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchMovieCast } from "services/movie-api";

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId).then((res) => {
      if (res.cast.length === 0) return;
      setCast(res.cast);
    });
  }, [movieId]);

  return (
    <>
      {cast ? (
        <ul className={s.list}>
          {cast.map((actor) => (
            <li className={s.item} key={actor.id}>
              <img
                className={s.profile}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                }
                alt={actor.name}
              />
              <h3 className={s.name}>{actor.name}</h3>
              <p className={s.char}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        `There're no information about cast`
      )}
    </>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
