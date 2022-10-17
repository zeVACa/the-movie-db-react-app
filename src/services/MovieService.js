export default class MovieService {
  constructor() {
    this.API_KEY = '5a2ff74dfa53b7281db30326bddc6e34';
    this.BASE_URL = 'https://api.themoviedb.org/3';
  }

  async getSearchedMovies(query, page) {
    const { BASE_URL, API_KEY } = this;
    let finalQuery = query;

    if (!query && query === '') {
      finalQuery = 'return';
    }

    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${finalQuery}&page=${page}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('server error');
    }

    return res.json();
  }

  async getGenres() {
    const { BASE_URL, API_KEY } = this;

    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('server error');
    }

    return res.json();
  }

  async getRatedMovies(page) {
    const { BASE_URL, API_KEY } = this;

    const guestSessionId = localStorage.getItem('guestSessionId');

    const url = `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&page=${page}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('server error');
    }

    return res.json();
  }

  async sendMovieRate(movieId, rate) {
    const { BASE_URL, API_KEY } = this;

    const guestSessionId = localStorage.getItem('guestSessionId');

    const url = `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`;

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        value: rate,
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!res.ok) {
      throw new Error('server error');
    }

    return res.json();
  }
}
