import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { getSession } from './components/cookie/userAuthCookie';
import App from './components/app/App';
import { setupStore } from './store/store';
import './firebase/firebase';
import './index.scss';

const sessionUser = getSession();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={setupStore(sessionUser)}>
      <App />
    </Provider>
  </React.StrictMode>
);
