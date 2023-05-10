import { NavLink } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { useGetLocalization } from '@/hooks/reduxHooks';
import localizationJSON from '@/assets/json/localization.json';

export default function MainPage() {
  const { isAuth } = useAuth();
  const { lang } = useGetLocalization();

  return (
    <>
      <h1>{localizationJSON[lang].titleWelcome}</h1>
      <br />
      {!isAuth ? (
        <>
          <NavLink to="/register">{localizationJSON[lang].titleSignUp}</NavLink>
          <br />
          <NavLink to="/login">{localizationJSON[lang].titleSignIn}</NavLink>
        </>
      ) : (
        <NavLink to="/graph">{localizationJSON[lang].titleMain}</NavLink>
      )}
    </>
  );
}
