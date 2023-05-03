import Sidebar from 'components/sidebar/Sidebar';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Playground from 'components/playground/Playground';

export default function GraphPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/404');
    }
  }, [isAuth, navigate]);

  return (
    <section className="container">
      <Sidebar />
      <Playground />
    </section>
  );
}
