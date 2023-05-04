import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import { getSession } from './cookie/userAuthCookie';
import App from './components/app/App';
import { setupStore } from './store/store';
import './firebase/firebase';
import './index.scss';
import { ELocalization } from './store/type';

const sessionUser = getSession();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={setupStore({ user: sessionUser.user, localization: ELocalization.ru })}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
