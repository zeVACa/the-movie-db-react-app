export default class MovieService {
  constructor() {
    this.API_KEY = '5a2ff74dfa53b7281db30326bddc6e34';
    this.BASE_URL = 'https://api.themoviedb.org/3';
  }

  async getSearchedMovies(query) {
    const { BASE_URL, API_KEY } = this;

    let finalQuery = query;

    if (query === '' || !query) {
      finalQuery = 'return';
    }

    // !TODO query needs to be url encoded

    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&query=${finalQuery}`;

    const res = await fetch(url);

    return res.json();
  }
}
