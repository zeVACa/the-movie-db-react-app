import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';

import FilmCardList from './components/FilmCardList';
import SearchFilmInput from './components/SearchFilmInput';

import './index.css';

function App() {
  return (
    <div className="App">
      <Online>
        <div className="page-wrapper">
          <SearchFilmInput />
          <FilmCardList />
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

export default App;
