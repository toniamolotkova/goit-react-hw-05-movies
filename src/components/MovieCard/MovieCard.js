import s from "./MovieCard.module.css";
import PropTypes from "prop-types";

const MovieCard = ({ movie }) => {
  return (
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
        <p className={s.subText}>User Score: {movie.vote_average * 10}%</p>
        <h3 className={s.title}>Overview</h3>
        <p className={s.text}>{movie.overview}</p>
        <h3 className={s.title}>Genres</h3>
        <p className={s.text}>
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default MovieCard;
