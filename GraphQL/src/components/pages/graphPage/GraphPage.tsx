import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useRemoveUser, useAppSelector } from '@/hooks/reduxHooks';
import { useAuth } from '@/hooks/useAuth';
import { endSession } from '@/cookie/userAuthCookie';
import localizationJSON from '@/assets/json/localization.json';

export default function GraphPage() {
  const removeUserDispatch = useRemoveUser();
  const navigate = useNavigate();
  const lang = useAppSelector((state) => state.localization);

  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  });

  const exit = () => {
    removeUserDispatch();
    endSession();
    navigate('/');
  };

  return (
    <div>
      <h1>{localizationJSON[lang].titleMain}</h1>
      <button onClick={exit}>{localizationJSON[lang].exit}</button>
    </div>
  );
}
