import React from 'react';
import { Rate } from 'antd';

import PropTypes from 'prop-types';

import 'antd/dist/antd.min.css';
import styles from './FilmCard.module.css';

function FilmCard({ title, description, rating, posterImaage, date, rateMovie, id, voteAverage }) {
  const onRatingChange = (rate) => {
    rateMovie(id, rate);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.imageArea}
        style={{
          backgroundImage: `url("${posterImaage}")`,
          backgroundSize: 'cover',
        }}
      />
      <div className={styles.cardContent}>
        <div className={styles.titleScoreRow}>
          <h3 className={styles.title}>{title.length > 33 ? `${title.slice(0, 33)}...` : title}</h3>
          <div className={styles.score}>{voteAverage}</div>
        </div>
        <span className={styles.date}>{date}</span>
        <div>
          <span className={styles.genre}>Action</span>
          <span className={styles.genre}>Drama</span>
        </div>
        <div className={styles.descriptionRateColumn}>
          <span className={styles.description}>{`${description.slice(0, 176)} ...`}</span>
          <Rate
            defaultValue={rating || 0}
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
  rating: PropTypes.string,
  posterImaage: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rateMovie: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  voteAverage: PropTypes.number,
};

FilmCard.defaultProps = {
  rating: '0',
  voteAverage: 0,
};

export default FilmCard;
