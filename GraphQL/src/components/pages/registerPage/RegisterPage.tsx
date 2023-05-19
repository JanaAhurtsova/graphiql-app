import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/firebase/firebase';
import Register from '../../register/Register';
import { useGetLocalization } from '@/hooks/reduxHooks';
import { Loader } from '@/components/loader/Loader';
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
    <>
      {loading || user ? (
        <section className={styles.section_loader}>
          <Loader />
        </section>
      ) : (
        <section className={styles.register_tabs}>
          <h3 className={styles.h}>{localizationJSON[lang].titleSignUp}</h3>
          <Register />
        </section>
      )}
    </>
  );
}
