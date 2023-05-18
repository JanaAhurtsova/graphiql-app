import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Login from '../../login/Login';
import { auth } from '@/firebase/firebase';
import { useGetLocalization } from '@/hooks/reduxHooks';
import localizationJSON from 'assets/json/localization.json';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const { lang } = useGetLocalization();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate('/graph');
    }
  });

  return (
    <section className={styles.login_tabs}>
      <h3 className={styles.h}>{localizationJSON[lang].titleSignIn}</h3>
      <Login />
    </section>
  );
}
