import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/reduxHooks';
import { useAuth } from '../../../hooks/useAuth';
import { removeUser } from '../../../store/slices/userSlice';
import { endSession } from '../../cookie/userAuthCookie';
import { useEffect } from 'react';

export default function GraphPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  });

  const exit = () => {
    dispatch(removeUser());
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
