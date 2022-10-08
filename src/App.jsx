import { Component } from 'react';

import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';

import MovieService from './services/MovieService';

import FilmCardList from './components/FilmCardList';
import SearchFilmInput from './components/SearchFilmInput';

import './index.css';

class App extends Component {
  movieService = new MovieService();

  constructor() {
    super();
    this.state = {
      movies: [],
      hasError: false,
      isDataLoading: true,
      totalDataItems: 0,
      query: 'return',
    };
  }

  renderCardListByQureyAndPage = (query, page) => {
    this.setState({ isDataLoading: true });
    this.movieService
      .getSearchedMovies(query, page)
      .then((response) => {
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

  setQuery = (query) => {
    this.setState({ query });
  };

  render() {
    const { movies, totalDataItems, isDataLoading, hasError, query } = this.state;

    return (
      <div className="App">
        <Online>
          <div className="page-wrapper">
            <SearchFilmInput
              renderCardListByQureyAndPage={this.renderCardListByQureyAndPage}
              setQuery={this.setQuery}
            />
            <FilmCardList
              renderCardListByQureyAndPage={this.renderCardListByQureyAndPage}
              movies={movies}
              totalDataItems={totalDataItems}
              isDataLoading={isDataLoading}
              hasError={hasError}
              query={query}
            />
          </div>
        </Online>
        <Offline>
          <div className="offline-message-area">
            <Alert
              message="Отсутствует подключение к интернету!"
              description="Проверьте интернет соединение и попробуйте снова"
              type="error"
              showIcon
            />
          </div>
        </Offline>
      </div>
    );
  }
}

export default App;
