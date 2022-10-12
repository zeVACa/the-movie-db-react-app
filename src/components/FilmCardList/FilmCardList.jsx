import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Alert, Spin } from 'antd';
import FilmCard from '../FilmCard';

import styles from './FilmCardList.module.css';
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
    const {
      movies,
      totalDataItems,
      isDataLoading,
      hasError,
      renderCardListByQureyAndPage,
      query,
      rateMovie,
      ratedMovies,
    } = this.props;

    const movieCardsWithPagination = (
      <div className={styles.cardList}>
        {movies.map(({ title, description, posterImaage, voteAverage, date, id, genreIds }) => (
          <FilmCard
            title={title}
            description={description}
            rating={ratedMovies[id]}
            posterImaage={posterImaage}
            voteAverage={voteAverage}
            date={date}
            key={id}
            rateMovie={rateMovie}
            id={id}
            genreIds={genreIds}
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
            query={query}
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
  query: PropTypes.string.isRequired,
  rateMovie: PropTypes.func.isRequired,
  ratedMovies: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FilmCardList;
