import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{(isRouteErrorResponse(error) && error.statusText) || 'Unknown Error'}</p>
    </>
  );
}
