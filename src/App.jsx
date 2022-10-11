import { Component } from 'react';

import { Offline, Online } from 'react-detect-offline';
import { Alert, Tabs } from 'antd';

import MovieService from './services/MovieService';

import FilmCardList from './components/FilmCardList';
import SearchFilmInput from './components/SearchFilmInput';

import './index.css';
import RatedFilmList from './components/RatedFilmList/RatedFilmList';

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
      ratedMovies: {},
    };
  }

  componentDidMount() {
    const moviesId = Object.keys(localStorage).filter((key) => key !== 'guestSessionId');
    const ratedMovies = {};

    for (let i = 0; i < moviesId.length; i += 1) {
      ratedMovies[moviesId[i]] = localStorage.getItem(moviesId[i]);
    }

    this.setState({ ratedMovies });
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
            voteAverage: movie.vote_average,
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

  rateMovie = (id, rating) => {
    localStorage.setItem(id, rating);
    this.movieService.sendMovieRate(id, rating);
    this.setState((state) => ({
      ratedMovies: { ...state.ratedMovies, [id]: String(rating) },
    }));
  };

  render() {
    const { movies, totalDataItems, isDataLoading, hasError, query, ratedMovies } = this.state;

    this.movieService.getGuestSessionId().then((data) => {
      if (!localStorage.getItem('guestSessionId')) {
        localStorage.clear();
        localStorage.setItem('guestSessionId', data.guest_session_id);
      }
    });

    const items = [
      {
        label: 'Search',
        key: '1',
        children: (
          <div>
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
              rateMovie={this.rateMovie}
              ratedMovies={ratedMovies}
            />
          </div>
        ),
      },
      {
        label: 'Rated',
        key: '2',
        children: <RatedFilmList ratedMoviesId={ratedMovies} rateMovie={this.rateMovie} />,
      },
    ];

    return (
      <div className="App">
        <Online>
          <div className="page-wrapper">
            <Tabs defaultActiveKey="1" centered items={items} destroyInactiveTabPane />
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
