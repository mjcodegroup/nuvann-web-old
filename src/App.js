import './Global.scss';

import { Router} from 'react-router-dom';

import Routes from './routes';
import {history} from './history';

import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <AuthProvider>
        <Router history={history}>
          <Routes />
        </Router>
    </AuthProvider>
  );
}

export default App;
