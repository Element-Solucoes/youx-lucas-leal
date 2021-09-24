import { NewPatientFormContainer } from '../styled-components/forms/NewPatientFormContainer';
import InputMask from 'react-input-mask';
import { DefaultButton } from '../styled-components/buttons/DefaultButton';
import { CloseButton } from '../styled-components/buttons/CloseButton';
import { NewPatientFormCallback } from '../interfaces/NewPatientFormCallback';
import { useEffect, useState } from 'react';
import { FormFeedback } from '../styled-components/texts/FormFeedback';
import { RequestMaker } from '../classes/RequestMaker';
import { UFDefinition } from '../interfaces/UFDefinition';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Formatter } from '../classes/Formatter';

export function NewPatientForm(props: NewPatientFormCallback): JSX.Element {
  // Controla algumas variáveis não essenciais no formulário.
  const [sending, setSending] = useState(false);
  const [feedBack, setFeedBack] = useState('');
  const [ufList, setUfList] = useState(['']);

  // Dados do formulário.
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [born, setBorn] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [uf, setUf] = useState('');

  useEffect(() => {
    // Pega uma lista dos UFs.
    RequestMaker.MakeRequest('https://servicodados.ibge.gov.br/api/v1/localidades/estados', 'GET').then((data) => {
      const newUfList = [];
      for (const key in data) {
        const newUF = data[key] as UFDefinition;
        newUfList.push(newUF.sigla);
      }
      setUfList(newUfList);
    });

    // Limpa o componente para que o React não dispare warnings quando o mesmo for desmontado.
    return () => {
      setSending(false);
      setFeedBack('');
      setUfList(['']);
      setName('');
      setCpf('');
      setBorn('');
      setWeight('');
      setHeight('');
      setUf('');
    };
  }, []);

  const confirmAddPatient = () => {
    // Seta como carregando.
    setSending(true);
    setFeedBack('');

    // Configura o peso e altura apropriadamente.
    const parsed_weight = parseFloat(weight.replaceAll(' kg', ''));
    const parsed_height = parseFloat(height.replaceAll(' m', ''));

    // Monta o pacote de dados.
    const data = {
      nome: name,
      cpf: cpf.replaceAll(' ', '').replaceAll('.', '').replaceAll('-', ''),
      uf: uf,
      nascimento: born != '' ? new Formatter().FormatDate(born) : '',
      peso: isNaN(parsed_weight) ? 0 : parsed_weight,
      altura: isNaN(parsed_height) ? 0 : parsed_height,
    };

    RequestMaker.MakeRequest(`${process.env.REACT_APP_BACKEND_URL}/addPatient`, 'POST', data)
      .then(() => {
        props.reloadPatientsCallback();
      })
      .catch((error) => {
        if (error == 'Sucesso.') {
          props.reloadPatientsCallback();
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
    <NewPatientFormContainer onSubmit={handleSubmit}>
      <input
        disabled={sending}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="patient_name"
        placeholder="Nome do paciente"
        required
      />
      <InputMask
        disabled={sending}
        onChange={(e) => setCpf(e.target.value)}
        mask="999.999.999-99"
        type="text"
        name="patient_cpf"
        placeholder="CPF do paciente"
        required
      />
      <input
        disabled={sending}
        onChange={(e) => setBorn(e.target.value)}
        type="date"
        name="patient_born"
        placeholder="Data de Nascimento"
      />
      <InputMask
        disabled={sending}
        onChange={(e) => setWeight(e.target.value)}
        mask="999.99 kg"
        type="text"
        name="patient_weight"
        placeholder="Peso do paciente"
      />
      <InputMask
        disabled={sending}
        onChange={(e) => setHeight(e.target.value)}
        mask="9.99 m"
        type="text"
        name="patient_height"
        placeholder="Altura do paciente"
      />
      <Dropdown
        className={sending ? 'disabled' : ''}
        disabled={sending}
        options={ufList}
        onChange={(e) => setUf(e.value)}
        placeholder="Selecione o UF."
      />
      <FormFeedback>{feedBack}</FormFeedback>
      <DefaultButton disabled={sending} type="submit" onClick={confirmAddPatient}>
        Enviar
      </DefaultButton>
      <CloseButton style={{ marginTop: '0.5em' }} disabled={sending} onClick={props.cancelCallback}>
        Cancelar
      </CloseButton>
    </NewPatientFormContainer>
  );
}
