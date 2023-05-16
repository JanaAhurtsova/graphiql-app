import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import { Layout } from 'antd';

import { useAuth } from 'hooks/useAuth';
import { useGetLocalization, useRemoveUser } from 'hooks/reduxHooks';
import { endSession } from '@/localStore/userAuthCookie';
import SwitchLanguage from '../switchLanguage/SwitchLanguage';
import langJSON from 'assets/json/localization.json';
import styles from 'components/header/Header.module.scss';

const { Header } = Layout;

export default function AppHeader() {
  const { isAuth } = useAuth();
  const removeUserDispatch = useRemoveUser();
  const { lang } = useGetLocalization();

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
    <Header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/">{langJSON[lang].titleWelcome}</NavLink>
        {!isAuth ? (
          <>
            <NavLink to="/signin">{langJSON[lang].titleSignIn}</NavLink>
            <NavLink to="/signup">{langJSON[lang].titleSignUp}</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/graph">{langJSON[lang].titleMain}</NavLink>
            <NavLink to="/" onClick={exit}>
              {langJSON[lang].exit}
            </NavLink>
          </>
        )}
      </nav>
      <SwitchLanguage />
    </Header>
  );
}
