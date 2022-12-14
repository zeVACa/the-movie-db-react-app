import { Component } from 'react';

import { Offline, Online } from 'react-detect-offline';
import { Alert, Tabs } from 'antd';

import MovieService from './services/MovieService';
import SessionService from './services/SessionSevice';
import GenresContext from './components/GenresContext';

import FilmCardList from './components/FilmCardList';
import SearchFilmInput from './components/SearchFilmInput';

import './index.css';
import RatedFilmList from './components/RatedFilmList/RatedFilmList';

class App extends Component {
  movieService = new MovieService();

  sessionService = new SessionService();

  constructor() {
    super();
    this.state = {
      movies: [],
      hasError: false,
      isDataLoading: true,
      totalDataItems: 0,
      query: 'return',
      ratedMovies: {},
      genres: [],
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('guestSessionId')) {
      this.sessionService
        .getGuestSessionId()
        .then((data) => {
          localStorage.setItem('guestSessionId', data.guest_session_id);
        })
        .then(() => this.getRatedMovies())
        .then(() => this.movieService.getGenres())
        .then((data) => this.setState({ genres: data.genres }));
      this.movieService.getGenres().then((data) => this.setState({ genres: data.genres }));
      return;
    }

    this.getRatedMovies();
    this.movieService.getGenres().then((data) => this.setState({ genres: data.genres }));
  }

  getRatedMovies = () => {
    this.movieService
      .getRatedMovies(1)
      .then((res) => res.total_pages)
      .then((pages) => {
        const allMovies = [];

        for (let i = 1; i <= pages; i += 1) {
          allMovies.push(this.movieService.getRatedMovies(i));
        }

        Promise.all(allMovies).then((res) => {
          this.setState({
            ratedMovies: res
              .reduce((accum, page) => [...accum, ...page.results], [])
              .map((movie) => ({ [movie.id]: movie.rating }))
              .reduce(
                (accum, obj) => ({ ...accum, [Object.keys(obj)[0]]: obj[Object.keys(obj)[0]] }),
                {}
              ),
          });
        });
      });
  };

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
            posterImage: movie.poster_path
              ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              : null,
            genreIds: movie.genre_ids,
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
    this.movieService.sendMovieRate(id, rating);
    this.setState((state) => ({
      ratedMovies: { ...state.ratedMovies, [id]: rating },
    }));
  };

  render() {
    const { movies, totalDataItems, isDataLoading, hasError, query, ratedMovies, genres } =
      this.state;

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
          <GenresContext.Provider value={genres}>
            <div className="page-wrapper">
              <Tabs defaultActiveKey="1" centered items={items} destroyInactiveTabPane />
            </div>
          </GenresContext.Provider>
        </Online>
        <Offline>
          <div className="offline-message-area">
            <Alert
              message="?????????????????????? ?????????????????????? ?? ??????????????????!"
              description="?????????????????? ???????????????? ???????????????????? ?? ???????????????????? ??????????"
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
