import { NavLink } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';

export default function MainPage() {
  const { isAuth } = useAuth();

  return (
    <>
      <h1>Main</h1>
      {!isAuth ? (
        <>
          <NavLink to="/register">Register</NavLink>
          <br />
          <NavLink to="/login">Login</NavLink>
        </>
      ) : (
        <NavLink to="/graph">Graph</NavLink>
      )}
    </>
  );
}
