import s from "./Cast.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "services/movie-api";
import image from "../../assets/default-non-user-no-photo.jpeg";
const Cast = () => {
  const { movieId } = useParams();

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
                    : `${image}`
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

export default Cast;
