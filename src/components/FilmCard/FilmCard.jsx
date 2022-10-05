import React from 'react';
import { Rate } from 'antd';

import PropTypes from 'prop-types';

import 'antd/dist/antd.min.css';
import styles from './FilmCard.module.css';

function FilmCard({ title, description, rating, posterImaage, date }) {
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
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.score}>{rating}</div>
        </div>
        <span className={styles.date}>{date}</span>
        <div>
          <span className={styles.genre}>Action</span>
          <span className={styles.genre}>Drama</span>
        </div>
        <div className={styles.descriptionRateColumn}>
          <span className={styles.description}>
            {`${description.split(' ').slice(0, 28).join(' ')} ...`}
          </span>
          <Rate
            allowHalf
            defaultValue={2.5}
            count={10}
            className={styles.stars}
          />
        </div>
      </div>
    </div>
  );
}

FilmCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  posterImaage: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

FilmCard.defaultPops = {
  title: '',
  description: '',
  rating: 10,
  posterImaage: '',
  date: '',
};

export default FilmCard;
