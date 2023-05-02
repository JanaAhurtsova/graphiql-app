import { useNavigate } from 'react-router-dom';

import { useRemoveUser } from '../../../hooks/reduxHooks';
import { useAuth } from '../../../hooks/useAuth';
import { endSession } from '../../cookie/userAuthCookie';
import { useEffect } from 'react';

export default function GraphPage() {
  const removeUserDispatch = useRemoveUser();
  const navigate = useNavigate();

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
      <h1>Welcome</h1>
      <button onClick={exit}>Exit</button>
    </div>
  );
}
