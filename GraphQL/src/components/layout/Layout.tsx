import { Outlet } from 'react-router-dom';
import { AppFooter } from 'components/footer/Footer';

export const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
      <AppFooter />
    </>
  );
};
