import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Alert, Spin } from 'antd';
import FilmCard from '../FilmCard';

import styles from './CardList.module.css';
import FilmsPagination from '../FilmsPagination/FilmsPagination';

class FilmCardList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { renderCardListByQureyAndPage } = this.props;
    renderCardListByQureyAndPage('return', 1);
  }

  render() {
    const { movies, totalDataItems, isDataLoading, hasError, renderCardListByQureyAndPage } =
      this.props;

    const movieCardsWithPagination = (
      <div className={styles.cardList}>
        {movies.map(({ title, description, rating, posterImaage, date, id }) => (
          <FilmCard
            title={title}
            description={description}
            rating={rating}
            posterImaage={posterImaage}
            date={date}
            key={id}
          />
        ))}
      </div>
    );

    return (
      <div>
        {hasError && (
          <Alert
            message="Ошибка!"
            description="При запросе произошла ошибка. Попробуйте снова"
            type="error"
            showIcon
          />
        )}
        {isDataLoading && !hasError ? (
          <div className="loader-area">
            <Spin size="large" />
          </div>
        ) : (
          !hasError && movies.length !== 0 && movieCardsWithPagination
        )}

        {!hasError && (
          <FilmsPagination
            totalDataItems={totalDataItems}
            renderCardListByQureyAndPage={renderCardListByQureyAndPage}
          />
        )}
        {!isDataLoading && !hasError && movies.length === 0 && (
          <h2>По вашему запросу ничего не было найдено. Попробуй еще раз!</h2>
        )}
      </div>
    );
  }
}

FilmCardList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      rating: PropTypes.number,
      date: PropTypes.string,
      id: PropTypes.number,
      posterImaage: PropTypes.string,
    })
  ).isRequired,
  totalDataItems: PropTypes.number.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  renderCardListByQureyAndPage: PropTypes.func.isRequired,
};

export default FilmCardList;
