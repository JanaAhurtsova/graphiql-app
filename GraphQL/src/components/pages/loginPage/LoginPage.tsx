import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Login from '../../login/Login';
import { useAuth } from '../../../hooks/useAuth';
import { useAppSelector } from '@/hooks/reduxHooks';
import localizationJSON from '@/assets/json/localization.json';

export default function LoginPage() {
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
      <h3>{localizationJSON[lang].titleSignIn}</h3>
      <Login />
      <NavLink to="/register">{localizationJSON[lang].titleSignUp}</NavLink>
    </div>
  );
}
