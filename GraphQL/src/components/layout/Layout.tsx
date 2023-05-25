import { Outlet } from 'react-router-dom';

import { AppFooter } from 'components/footer/Footer';
import AppHeader from '../header/Header';

export const Layout: React.FC = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};
