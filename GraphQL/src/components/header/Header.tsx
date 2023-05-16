import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import { Layout } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useGetLocalization } from 'hooks/reduxHooks';
import SwitchLanguage from '../switchLanguage/SwitchLanguage';
import { auth, logout } from '@/firebase/firebase';
import langJSON from 'assets/json/localization.json';
import styles from 'components/header/Header.module.scss';

const { Header } = Layout;

export default function AppHeader() {
  const [user] = useAuthState(auth);
  const { lang } = useGetLocalization();

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
        {!user ? (
          <>
            <NavLink to="/signin">{langJSON[lang].titleSignIn}</NavLink>
            <NavLink to="/signup">{langJSON[lang].titleSignUp}</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/graph">{langJSON[lang].titleMain}</NavLink>
            <NavLink to="/" onClick={logout}>
              {langJSON[lang].exit}
            </NavLink>
          </>
        )}
      </nav>
      <SwitchLanguage />
    </Header>
  );
}
