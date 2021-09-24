import { Redirect, Route } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { PrivateRouteProps } from '../interfaces/PrivateRouteProps';

export const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
  // O componente de Private Route garante que usuários não autenticados não consigam
  // ver as páginas relevantes.
  const { component, ...rest } = props;
  const currentUser = useAuth();

  return <Route {...rest} render={() => (currentUser ? component : <Redirect to="/login" />)} />;
};
