import React, { Component } from 'react';

import FilmCard from '../FilmCard/FilmCard';
import MovieService from '../../services/MovieService';

import styles from './CardList.module.css';

class FilmCardList extends Component {
  movieService = new MovieService();

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.movieService.getSearchedMovies('').then((response) => {
      console.log(response);
      this.setState({
        movies: response.results.map((movie) => ({
          title: movie.original_title,
          description: movie.overview,
          rating: movie.vote_average,
          date: movie.release_date,
          id: movie.id,
          posterImaage: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        })),
      });
    });
  }

  render() {
    const { movies } = this.state;

    return (
      <div className={styles.cardList}>
        {movies.map(
          ({ title, description, rating, posterImaage, date, id }) => (
            <FilmCard
              title={title}
              description={description}
              rating={rating}
              posterImaage={posterImaage}
              date={date}
              key={id}
            />
          )
        )}
      </div>
    );
  }
}

export default FilmCardList;
