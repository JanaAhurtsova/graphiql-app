import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <section className="container">
      <p className={styles.text}>
        Sorry, an unexpected error has occurred. Go to <Link to="/">Welcome</Link>
      </p>
      <p className={styles.text}>
        {(isRouteErrorResponse(error) && error.statusText) || 'Unknown Error'}
      </p>
    </section>
  );
}
