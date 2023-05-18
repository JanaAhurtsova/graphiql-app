import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useGetLocalization } from '@/hooks/reduxHooks';
import { auth } from '@/firebase/firebase';

import localizationJSON from '@/assets/json/localization.json';

export default function MainPage() {
  const [user, loading] = useAuthState(auth);
  const { lang } = useGetLocalization();

  return (
    <>
      <h1>{localizationJSON[lang].titleWelcome}</h1>
      <br />
      {!loading &&
        (!user ? (
          <>
            <NavLink to="/register">{localizationJSON[lang].titleSignUp}</NavLink>
            <br />
            <NavLink to="/login">{localizationJSON[lang].titleSignIn}</NavLink>
          </>
        ) : (
          <NavLink to="/graph">{localizationJSON[lang].titleMain}</NavLink>
        ))}
    </>
  );
}
