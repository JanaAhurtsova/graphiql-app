import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from '../pages/loginPage/LoginPage';
import RegisterPage from '../pages/registerPage/RegisterPage';
import MainPage from '../pages/mainPage/MainPage';
import ErrorPage from '../pages/errorPage/ErrorPage';
import GraphPage from '../pages/graphPage/GraphPage';

import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/graph',
    element: <GraphPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
