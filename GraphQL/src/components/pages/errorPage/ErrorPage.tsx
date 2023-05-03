import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <section className="container">
      <p>
        Sorry, an unexpected error has occurred. Go to <Link to="/">Main</Link>
      </p>
      <p>{(isRouteErrorResponse(error) && error.statusText) || 'Unknown Error'}</p>
    </section>
  );
}
