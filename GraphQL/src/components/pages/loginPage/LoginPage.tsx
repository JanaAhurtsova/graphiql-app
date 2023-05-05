import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Login from '../../login/Login';
import { useAuth } from '../../../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate('/graph');
    }
  });
  return (
    <section className="container">
      <h3>Login</h3>
      <Login />
      <NavLink to="/signup">Sign up</NavLink>
    </section>
  );
}
