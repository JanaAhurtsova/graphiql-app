import { NavLink } from 'react-router-dom';
import { Layout } from 'antd';

import { useAuth } from 'hooks/useAuth';
import { useAppSelector, useRemoveUser } from '../../hooks/reduxHooks';
import { endSession } from '@/localStore/userAuthCookie';
import SwitchLanguage from '../switchLanguage/SwitchLanguage';
import langJSON from 'assets/json/localization.json';
import styles from 'components/header/Header.module.scss';

const { Header } = Layout;

export default function AppHeader() {
  const { isAuth } = useAuth();
  const removeUserDispatch = useRemoveUser();
  const { lang } = useAppSelector((state) => state.localization);

  const exit = () => {
    removeUserDispatch();
    endSession();
  };

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
