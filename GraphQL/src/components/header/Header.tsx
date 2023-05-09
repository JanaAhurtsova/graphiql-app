import styles from 'components/header/Header.module.scss';
import { NavLink } from 'react-router-dom';
import { Layout } from 'antd';
import { useAuth } from 'hooks/useAuth';
import { useRemoveUser } from '../../hooks/reduxHooks';
import { endSession } from '../cookie/userAuthCookie';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const { Header } = Layout;

export default function AppHeader() {
  const { isAuth } = useAuth();
  const removeUserDispatch = useRemoveUser();

  const exit = () => {
    removeUserDispatch();
    endSession();
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      gsap.to('.ant-layout-header', {
        backgroundColor: '#000 ',
        duration: 0.5,
        ease: 'none',
      });
    } else {
      gsap.to('.ant-layout-header', {
        backgroundColor: '#001529 ',
        duration: 0.5,
        ease: 'none',
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Header
      className="app-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        backgroundColor: '#001529',
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
            <NavLink to="/signout" onClick={exit}>
              Sign out
            </NavLink>
          </>
        )}
      </nav>
    </Header>
  );
}
