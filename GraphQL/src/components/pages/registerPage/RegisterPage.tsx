import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Register from '../../register/Register';
import { useAuth } from '../../../hooks/useAuth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate('/graph');
    }
  });
  return (
    <section className="container">
      <h3>Register</h3>
      <Register />
      <NavLink to="/signin">Sign in</NavLink>
    </section>
  );
}
