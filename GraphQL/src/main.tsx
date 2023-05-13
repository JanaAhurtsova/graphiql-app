import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import { getSession } from './localStore/userAuthCookie';
import App from './components/app/App';
import { setupStore } from './store/store';
import { getLocalization } from './localStore/localStorage';
import './firebase/firebase';
import './index.scss';
import ErrorBoundaryComponent from './components/errorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={setupStore({ user: getSession(), localization: getLocalization() })}>
      <ErrorBoundaryComponent>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#00b96b',
            },
          }}
        >
          <App />
        </ConfigProvider>
      </ErrorBoundaryComponent>
    </Provider>
  </React.StrictMode>
);
