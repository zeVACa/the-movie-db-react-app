import { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Spin } from 'antd';
import FilmCard from '../FilmCard';

import MovieService from '../../services/MovieService';
import styles from './RatedFilmList.module.css';

class RatedFilmList extends Component {
  movieService = new MovieService();

  constructor() {
    super();
    this.state = {
      ratedMovies: [],
      isDataLoading: true,
      page: 1,
      totalDataItems: 0,
    };
  }

  componentDidMount() {
    this.getRatedMovies(1);
  }

  getRatedMovies = (page) => {
    this.movieService.getRatedMovies(page).then((data) => {
      console.log(data);
      this.setState({
        ratedMovies: data.results.map((movie) => ({
          title: movie.original_title,
          description: movie.overview,
          voteAverage: Math.floor(movie.vote_average * 10) / 10,
          posterImaage: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          date: movie.release_date,
          id: movie.id,
          genreIds: movie.genre_ids,
        })),
        isDataLoading: false,
        totalDataItems: data.total_results,
      });
    });
  };

  onPageChange = (page) => {
    this.setState({ page, isDataLoading: true });
    this.getRatedMovies(page);
  };

  render() {
    const { ratedMovies, isDataLoading, page, totalDataItems } = this.state;
    const { rateMovie, ratedMoviesId } = this.props;

    console.log(ratedMovies);

    const moviesCardsWithPagination = (
      <div className="card-list-global">
        {ratedMovies.map(
          ({ title, description, voteAverage, posterImaage, date, id, genreIds }) => (
            <FilmCard
              title={title}
              description={description}
              rating={ratedMoviesId[id]}
              posterImaage={posterImaage}
              voteAverage={voteAverage}
              date={date}
              key={id}
              rateMovie={rateMovie}
              id={id}
              genreIds={genreIds}
            />
          )
        )}
        {!isDataLoading && ratedMovies.length !== 0 && (
          <div className={styles.pagination}>
            <Pagination
              current={page}
              pageSize="20"
              total={totalDataItems > 10000 ? 10000 : totalDataItems}
              onChange={this.onPageChange}
            />
          </div>
        )}
      </div>
    );

    return (
      <div>
        {isDataLoading ? (
          <div className="loader-area">
            <Spin size="large" />
          </div>
        ) : (
          ratedMovies.length > 0 && moviesCardsWithPagination
        )}
        {!isDataLoading && ratedMovies.length === 0 && <h2>Вы пока не оценили ни один фильм</h2>}
      </div>
    );
  }
}

RatedFilmList.propTypes = {
  rateMovie: PropTypes.func.isRequired,
  ratedMoviesId: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RatedFilmList;
