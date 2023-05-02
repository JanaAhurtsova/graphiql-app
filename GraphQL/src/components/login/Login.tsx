import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useSetUser } from '../../hooks/reduxHooks';
import { startSession } from '../cookie/userAuthCookie';
import { SyntheticEvent, useState } from 'react';

export default function Login() {
  const setUserDispatch = useSetUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUserDispatch({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        });
        startSession(String(user.email), user.refreshToken, user.uid);
        navigate('/graph');
      })
      .catch(console.error);
  };

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}
