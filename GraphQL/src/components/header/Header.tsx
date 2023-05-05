import { NavLink } from 'react-router-dom';
import { Layout } from 'antd';
import { useAuth } from 'hooks/useAuth';
import styles from 'components/header/Header.module.scss';
import { useRemoveUser } from '../../hooks/reduxHooks';
import { endSession } from '@/localStore/userAuthCookie';

const { Header } = Layout;

export default function AppHeader() {
  const { isAuth } = useAuth();
  const removeUserDispatch = useRemoveUser();

  const exit = () => {
    removeUserDispatch();
    endSession();
  };

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        height: '50px',
        lineHeight: '50px',
      }}
    >
      <nav className={styles.nav}>
        <NavLink to="/">Welcome</NavLink>
        {!isAuth ? (
          <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/graph">Graph</NavLink>
            <NavLink to="/" onClick={exit}>
              Sign out
            </NavLink>
          </>
        )}
      </nav>
    </Header>
  );
}
