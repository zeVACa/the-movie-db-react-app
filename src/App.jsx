import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';

import CardList from './components/FilmCardList/FilmCardList';
import './index.css';

function App() {
  return (
    <div className="App">
      <Online>
        <div className="page-wrapper">
          <CardList />
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
