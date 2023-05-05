import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from 'components/layout/Layout';
import LoginPage from 'components/pages/loginPage/LoginPage';
import RegisterPage from 'components/pages/registerPage/RegisterPage';
import GraphPage from 'components/pages/graphPage/GraphPage';
import ErrorPage from 'components/pages/errorPage/ErrorPage';
import WelcomePage from 'components/pages/welcomePage/WelcomePage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<WelcomePage />} />
      <Route path="signup" element={<RegisterPage />} />
      <Route path="signin" element={<LoginPage />} />
      <Route path="graph" element={<GraphPage />} />
      <Route path="404" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="404" replace />} />
    </Route>
  )
);
