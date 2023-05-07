import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Register from '../../register/Register';
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/hooks/reduxHooks';
import localizationJSON from '@/assets/json/localization.json';
import styles from './registerPage.module.scss';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { lang } = useAppSelector((state) => state.localization);

  useEffect(() => {
    if (isAuth) {
      navigate('/graph');
    }
  });
  return (
    <section className={styles.register_tabs}>
      <h3>{localizationJSON[lang].titleSignUp}</h3>
      <Register />
    </section>
  );
}
