import React, { Component } from 'react';

import { Alert, Spin } from 'antd';
import FilmCard from '../FilmCard/FilmCard';
import MovieService from '../../services/MovieService';

import styles from './CardList.module.css';
import FilmsPagination from '../FilmsPagination/FilmsPagination';

class FilmCardList extends Component {
  movieService = new MovieService();

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      hasError: false,
      isDataLoading: true,
      totalDataItems: 0,
    };
  }

  componentDidMount() {
    this.renderCardListByQureyAndPage('return', 1);
  }

  renderCardListByQureyAndPage = (query, page) => {
    this.movieService
      .getSearchedMovies(query, page)
      .then((response) => {
        console.log(response);
        this.setState({
          movies: response.results.map((movie) => ({
            title: movie.original_title,
            description: movie.overview,
            rating: movie.vote_average,
            date: movie.release_date,
            id: movie.id,
            posterImaage: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          })),
          totalDataItems: response.total_results,
          isDataLoading: false,
        });
      })
      .catch(() => {
        this.setState({ hasError: true });
      });
  };

  render() {
    const { movies, hasError, isDataLoading, totalDataItems } = this.state;

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
        <FilmsPagination
          totalDataItems={totalDataItems}
          renderCardListByQureyAndPage={this.renderCardListByQureyAndPage}
        />
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
        {isDataLoading ? (
          <div className="loader-area">
            <Spin size="large" />
          </div>
        ) : (
          !hasError && movieCardsWithPagination
        )}
      </div>
    );
  }
}

export default FilmCardList;
