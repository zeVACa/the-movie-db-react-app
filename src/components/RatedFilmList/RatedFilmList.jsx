import { Component } from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../FilmCard';
import styles from './RatedFilmList.module.css';

import MovieService from '../../services/MovieService';

class RatedFilmList extends Component {
  movieService = new MovieService();

  constructor() {
    super();
    this.state = {
      ratedMovies: [],
    };
  }

  componentDidMount() {
    this.getRatedMovies();
  }

  getRatedMovies = () => {
    this.movieService.getRatedMovies().then((data) =>
      this.setState({
        ratedMovies: data.results.map((movie) => ({
          title: movie.original_title,
          description: movie.overview,
          voteAverage: Math.floor(movie.vote_average * 10) / 10,
          posterImaage: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          date: movie.release_date,
          id: movie.id,
        })),
      })
    );
  };

  render() {
    const { ratedMovies } = this.state;
    const { rateMovie, ratedMoviesId } = this.props;

    return (
      <div className={styles.cardList}>
        {ratedMovies.length > 0 ? (
          ratedMovies.map(({ title, description, voteAverage, posterImaage, date, id }) => (
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
            />
          ))
        ) : (
          <h2>Вы пока не оценили ни один фильм</h2>
        )}
      </div>
    );
  }
}

RatedFilmList.propTypes = {
  rateMovie: PropTypes.func.isRequired,
  ratedMoviesId: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RatedFilmList;
