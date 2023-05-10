import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Login from '../../login/Login';
import { useAuth } from '@/hooks/useAuth';
import { useGetLocalization } from '@/hooks/reduxHooks';
import localizationJSON from 'assets/json/localization.json';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { lang } = useGetLocalization();

  useEffect(() => {
    if (isAuth) {
      navigate('/graph');
    }
  });
  return (
    <section className={styles.login_tabs}>
      <h3>{localizationJSON[lang].titleSignIn}</h3>
      <Login />
    </section>
  );
}
