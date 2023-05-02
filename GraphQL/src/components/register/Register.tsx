import { useNavigate } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useSetUser } from '../../hooks/reduxHooks';
import { startSession } from '../../components/cookie/userAuthCookie';

export default function Register() {
  const registerUserDispatch = useSetUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleRegister = (e: SyntheticEvent) => {
    e.preventDefault();
    if (passwordRepeat !== password) {
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        registerUserDispatch({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        });
        navigate('/graph');
        startSession(String(user.email), user.refreshToken, user.uid);
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
      <input
        type="password"
        value={passwordRepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
        placeholder="password"
      />
      <br />
      <button onClick={handleRegister}>Registration</button>
    </form>
  );
}
