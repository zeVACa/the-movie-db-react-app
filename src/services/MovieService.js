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

    // !TODO query needs to be url encoded

    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${finalQuery}&page=${page}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('server error');
    }

    return res.json();
  }
}
