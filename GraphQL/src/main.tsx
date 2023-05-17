import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { getSession } from './localStore/userAuthCookie';
import App from './components/app/App';
import { setupStore } from './store/store';
import { getLocalization } from './localStore/localStorage';
import './firebase/firebase';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={setupStore({ user: getSession(), localization: getLocalization() })}>
      <App />
    </Provider>
  </React.StrictMode>
);
