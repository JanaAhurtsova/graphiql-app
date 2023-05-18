import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { router } from '../../router/Router';
import './App.scss';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
