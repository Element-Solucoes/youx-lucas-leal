import firebase from 'firebase/app';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { Switch, Route, Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styled-components/globals/GlobalStyle';
import { LoginPage } from '../pages/LoginPage';
import { Default } from '../styled-components/themes/DefaultTheme';
import BrowserHistory from '../classes/BrowserHistory';
import { PrivateRoute } from './PrivateRoute';
import { Error404 } from '../pages/Error404';
import { Dashboard } from '../pages/Dashboard';
import { useEffect, useState } from 'react';
import { LoadingScreen } from './LoadingScreen';

export function App(): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const currentUser = useAuth();

  // Espera uma resposta do firebase para saber se existe um usuário autenticado.
  useEffect(() => {
    firebase.auth().onAuthStateChanged(() => {
      setLoaded(true);
    });
  }, [currentUser]);

  return (
    <ThemeProvider theme={Default}>
      <GlobalStyle />
      <Router history={BrowserHistory}>
        <AuthProvider>
          {loaded ? (
            <Switch>
              <PrivateRoute exact path="/" component={<Dashboard />} />
              <Route exact path="/login" component={LoginPage} />
              <Route path="/" component={Error404} />
            </Switch>
          ) : (
            <LoadingScreen shown={true} />
          )}
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
