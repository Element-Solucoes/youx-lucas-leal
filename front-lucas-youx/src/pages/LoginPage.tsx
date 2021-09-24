import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { LoadingScreen } from '../components/LoadingScreen';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { LoginFormContainer } from '../styled-components/containers/LoginFormContainer';
import { LoginFormWrapper } from '../styled-components/containers/LoginFormWrapper';
import { LoginPageWrapper } from '../styled-components/containers/LoginPageWrapper';
import { LoginIllustration } from '../styled-components/images/LoginIllustration';

export const LoginPage = withRouter((props) => {
  // Redireciona caso já estivermos logados.
  const currentUser = useAuth();
  const { history } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    } else {
      setLoading(false);
    }
  }, [currentUser, history]);

  return (
    <LoginPageWrapper>
      <LoadingScreen shown={loading} />
      <LoginFormWrapper>
        <LoginFormContainer>
          <h1>Login</h1>
          <LoginForm />
        </LoginFormContainer>
      </LoginFormWrapper>
      <LoginIllustration src="svgs/doctor.svg" alt="Uma ilustração de uma doutora." />
    </LoginPageWrapper>
  );
});
