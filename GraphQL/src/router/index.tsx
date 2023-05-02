import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from 'components/layout/Layout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* <Route index element={<Welcome />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="graphiql" element={<Graphiql />} />
      <Route path="404" element={<NotFoundPage />} /> */}
      <Route path="*" element={<Navigate to="404" replace />} />
    </Route>
  )
);
