export default class SessionService {
  constructor() {
    this.API_KEY = '5a2ff74dfa53b7281db30326bddc6e34';
    this.BASE_URL = 'https://api.themoviedb.org/3';
  }

  async getGuestSessionId() {
    const { BASE_URL, API_KEY } = this;

    const url = `${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('server error');
    }

    return res.json();
  }
}
