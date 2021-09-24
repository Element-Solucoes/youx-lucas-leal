import InputMask from 'react-input-mask';
import firebase from 'firebase/app';
import { DefaultButton } from '../styled-components/buttons/DefaultButton';
import { CloseButton } from '../styled-components/buttons/CloseButton';
import { useEffect, useState } from 'react';
import { FormFeedback } from '../styled-components/texts/FormFeedback';
import { RequestMaker } from '../classes/RequestMaker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { NewProfessionalFormCallback } from '../interfaces/NewProfessionalFormCallback';
import { NewProfessionalFormContainer } from '../styled-components/forms/NewProfessionalFormContainer';

export function NewProfessionalForm(props: NewProfessionalFormCallback): JSX.Element {
  // Controla algumas variáveis não essenciais no formulário.
  const [sending, setSending] = useState(false);
  const [feedBack, setFeedBack] = useState('');

  // Dados do formulário.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    // Limpa o componente para que o React não dispare warnings quando o mesmo for desmontado.
    return () => {
      setSending(false);
      setFeedBack('');
      setName('');
      setEmail('');
      setCpf('');
      setPass('');
      setPassConfirm('');
      setRole('');
    };
  }, []);

  const confirmAddProfessional = () => {
    // Seta como carregando.
    setSending(true);
    setFeedBack('');

    // Monta o pacote de dados.
    const data = {
      nome: name,
      cpf: cpf.replaceAll(' ', '').replaceAll('.', '').replaceAll('-', ''),
      password: pass,
      password_confirm: passConfirm,
      cargo: role.includes('Méd') ? 'MEDICO' : 'ENFERMEIRO',
      email: email,
      email_atual: firebase.auth().currentUser?.email,
    };

    RequestMaker.MakeRequest(`${process.env.REACT_APP_BACKEND_URL}/addProfessional`, 'POST', data)
      .then(() => {
        props.reloadProfessionalsCallback();
      })
      .catch((error) => {
        if (error == 'Sucesso.') {
          props.reloadProfessionalsCallback();
          return;
        }
        setFeedBack(error);
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
    <NewProfessionalFormContainer onSubmit={handleSubmit}>
      <input
        disabled={sending}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="professional_name"
        placeholder="Nome do profissional"
        autoComplete="false"
      />
      <input
        disabled={sending}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        name="professional_email"
        placeholder="E-mail do profissional"
        autoComplete="false"
      />
      <input
        disabled={sending}
        onChange={(e) => {
          setPass(e.currentTarget.value);
        }}
        type="text"
        name="professional_password"
        placeholder="Senha"
        autoComplete="false"
      />
      <input
        disabled={sending}
        onChange={(e) => {
          setPassConfirm(e.currentTarget.value);
        }}
        type="text"
        name="professional_password_confirm"
        placeholder="Confirme a senha"
        autoComplete="false"
      />
      <InputMask
        disabled={sending}
        onChange={(e) => setCpf(e.target.value)}
        mask="999.999.999-99"
        type="text"
        name="professional_cpf"
        placeholder="CPF do profissional"
        autoComplete="false"
      />
      <Dropdown
        className={sending ? 'disabled' : ''}
        disabled={sending}
        options={['Médico(a)', 'Enfermeiro(a)']}
        onChange={(e) => setRole(e.value)}
        placeholder="Selecione o cargo."
      />
      <FormFeedback>{feedBack}</FormFeedback>
      <DefaultButton disabled={sending} type="submit" onClick={confirmAddProfessional}>
        Enviar
      </DefaultButton>
      <CloseButton style={{ marginTop: '0.5em' }} disabled={sending} onClick={props.cancelCallback}>
        Cancelar
      </CloseButton>
    </NewProfessionalFormContainer>
  );
}
