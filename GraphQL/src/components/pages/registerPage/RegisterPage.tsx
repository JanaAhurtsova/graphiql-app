import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Register from '../../register/Register';
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/hooks/reduxHooks';
import localizationJSON from '@/assets/json/localization.json';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const lang = useAppSelector((state) => state.localization);

  useEffect(() => {
    if (isAuth) {
      navigate('/graph');
    }
  });
  return (
    <div>
      <h3>{localizationJSON[lang].titleSignUp}</h3>
      <Register />
      <NavLink to="/login">{localizationJSON[lang].titleSignIn}</NavLink>
    </div>
  );
}
