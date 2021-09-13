import s from "./Reviews.module.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchMovieReviews } from "services/movie-api";

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId).then((response) => {
      if (response.results.length === 0) return;
      setReviews(response.results);
    });
  }, [movieId]);

  return (
    <>
      {reviews ? (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li className={s.item} key={review.id}>
              <h3 className={s.name}>Author: {review.author}</h3>
              <p className={s.content}> "{review.content}"</p>
            </li>
          ))}
        </ul>
      ) : (
        `There're no reviews for this movie`
      )}
    </>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Reviews;
