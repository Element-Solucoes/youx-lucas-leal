import { useRef, useState } from 'react';
import { withRouter } from 'react-router';
import { auth } from '../contexts/AuthContext';
import { DefaultButton } from '../styled-components/buttons/DefaultButton';
import { FormFeedback } from '../styled-components/texts/FormFeedback';

export const LoginForm = withRouter((props) => {
  // Guarda as referências do nosso e-mail e senha do formulário.
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  // Para desativar os elementos do formulário.
  const [sending, setSending] = useState(false);
  // Guarda um feedback do formulário.
  const [feedback, setFeedback] = useState('');

  const { history } = props;

  // Esta função chama a API do Google para logar com e-mail e senha.
  const loginWithEmailAndPass = async () => {
    setSending(true);
    setFeedback('');
    auth
      .signInWithEmailAndPassword(
        email.current ? email.current.value : '',
        password.current ? password.current.value : '',
      )
      .then(() => {
        // Sucesso! Temos um usuário :D
        history.push('/');
      })
      .catch((error) => {
        // É... algo deu errado aqui.
        setFeedback(error.message);
      })
      .finally(() => {
        setSending(false);
      });
  };

  // Impede que o formulário recarregue a página.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={email} name="username" placeholder="Nome de usuário" disabled={sending} />
      <input type="password" ref={password} name="password" disabled={sending} />
      <FormFeedback>{feedback}</FormFeedback>
      <DefaultButton type="submit" name="Login" onClick={loginWithEmailAndPass} disabled={sending}>
        Login
      </DefaultButton>
    </form>
  );
});
