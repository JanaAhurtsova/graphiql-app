import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppFooter } from 'components/footer/Footer';
import AppHeader from '../header/Header';
import { Loader } from '../loader/Loader';

export const Layout: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </Suspense>
  );
};
