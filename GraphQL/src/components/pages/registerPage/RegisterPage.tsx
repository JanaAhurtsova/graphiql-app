import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/firebase/firebase';
import Register from '../../register/Register';
import { useGetLocalization } from '@/hooks/reduxHooks';
import localizationJSON from '@/assets/json/localization.json';
import styles from './registerPage.module.scss';

export default function RegisterPage() {
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
    <section className={styles.register_tabs}>
      <h3 className={styles.h}>{localizationJSON[lang].titleSignUp}</h3>
      <Register />
    </section>
  );
}
