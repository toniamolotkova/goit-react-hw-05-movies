import s from "./Cast.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "services/movie-api";

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <>
      <ul className={s.list}>
        {cast.map((actor) => (
          <li className={s.item} key={actor.id}>
            <img
              className={s.profile}
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
            />
            <h3 className={s.name}>{actor.name}</h3>
            <p className={s.char}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
