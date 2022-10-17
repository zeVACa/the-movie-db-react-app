import { Rate } from 'antd';

import PropTypes from 'prop-types';

import 'antd/dist/antd.min.css';
import styles from './FilmCard.module.css';
import GenresContext from '../GenresContext';
import imageNotFound from '../../assets/images/image-not-found-scaled-1150x647.png';

function FilmCard({
  title,
  description,
  rating,
  posterImage,
  date,
  rateMovie,
  id,
  voteAverage,
  genreIds,
}) {
  const onRatingChange = (rate) => {
    rateMovie(id, rate);
  };

  const getAverageVoteColor = (average) => {
    if (average >= 0 && average < 3) return '#E90000';
    if (average >= 3 && average < 5) return '#E97E00';
    if (average >= 5 && average < 7) return '#E9D100';
    if (average >= 7) return '#66E900';
    return '#000000';
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.imageArea}
        style={
          posterImage
            ? {
                backgroundImage: `url("${posterImage}")`,
                backgroundSize: 'cover',
              }
            : {
                backgroundImage: `url(${imageNotFound})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }
        }
      />
      <div className={styles.cardContent}>
        <div className={styles.titleScoreRow}>
          <h3 className={styles.title}>{title.length > 33 ? `${title.slice(0, 33)}...` : title}</h3>
          <div
            className={styles.score}
            style={{ border: `2px solid ${getAverageVoteColor(voteAverage)}` }}
          >
            {voteAverage}
          </div>
        </div>
        <span className={styles.date}>{date}</span>
        <div>
          <GenresContext.Consumer>
            {(allGenres) =>
              allGenres
                .filter((genre) => genreIds?.includes(genre.id))
                .slice(0, 6)
                .map((genre) => (
                  <span className={styles.genre} key={genre.id}>
                    {genre.name}
                  </span>
                ))
            }
          </GenresContext.Consumer>
        </div>
        <div className={styles.descriptionRateColumn}>
          <span className={styles.description}>
            {description?.length > 80
              ? ` ${
                  genreIds?.length <= 3 ? description.slice(0, 140) : description.slice(0, 80)
                } ...`
              : description}
          </span>
          <Rate
            value={rating}
            count={10}
            className={styles.stars}
            onChange={onRatingChange}
            rateMovie={rateMovie}
          />
        </div>
      </div>
    </div>
  );
}

FilmCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number,
  posterImage: PropTypes.string,
  date: PropTypes.string.isRequired,
  rateMovie: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  voteAverage: PropTypes.number,
  genreIds: PropTypes.arrayOf(PropTypes.number),
};

FilmCard.defaultProps = {
  rating: 0,
  voteAverage: 0,
  genreIds: [],
  posterImage: null,
};

export default FilmCard;
