import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { RequestMaker } from '../classes/RequestMaker';
import { LeafletMap } from '../components/LeafletMap';
import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import { NewPatientForm } from '../components/NewPatientForm';
import { PatientTable } from '../components/PatientTable';
import { PopUpHandler } from '../components/PopUpHandler';
import { useAuth } from '../contexts/AuthContext';
import { PopUpHandlerProps } from '../interfaces/PopUpHandlerProps';
import { UFDefinition } from '../interfaces/UFDefinition';
import { DefaultButton } from '../styled-components/buttons/DefaultButton';
import { DashboardContainer } from '../styled-components/containers/DashboardContainer';
import firebase from 'firebase/app';
import { ProfessionalTable } from '../components/ProfessionalTable';
import { NewProfessionalForm } from '../components/NewProfessionalForm';

export const Dashboard = withRouter((props) => {
  // Redireciona caso percamos o estado de login.
  const currentUser = useAuth();
  const { history } = props;

  const [reloadCounter, setReloadCounter] = useState(0);
  const [accountType, setAccountType] = useState('');
  const [scope, setScope] = useState('PACIENTES');
  const [loading, setLoading] = useState(true);

  const [map, setMap] = useState<Record<string, number>>({});
  const [ufList, setUfList] = useState<string[]>([]);

  const [popupData, setPopupData] = useState<PopUpHandlerProps>({
    title: '',
    text: '',
    type: 'NORMAL',
    shown: false,
  });

  // Limpa os popups da tela.
  const clearPopUps = () => {
    setPopupData({ ...popupData, shown: false });
  };

  // Recarrega as listas de usuário e/ou pacientes.
  const remountLists = () => {
    setReloadCounter(reloadCounter + 1);
    clearPopUps();
  };

  // Mostra um popup de adição de pacientes.
  const showAddPatient = () => {
    setPopupData({
      title: '😷 Novo Paciente',
      text: <NewPatientForm reloadPatientsCallback={remountLists} cancelCallback={clearPopUps} />,
      type: 'NORMAL',
      shown: true,
    });
  };

  // Mostra um popup de adição de profissionais.
  const showAddProfessional = () => {
    setPopupData({
      title: '🩺 Novo Profissional',
      text: <NewProfessionalForm reloadProfessionalsCallback={remountLists} cancelCallback={clearPopUps} />,
      type: 'NORMAL',
      shown: true,
    });
  };

  // Callback para a lista de pacientes (atualiza o mapa do Leaflet).
  const patientListCallback = (map: Record<string, number>) => {
    RequestMaker.MakeRequest('https://servicodados.ibge.gov.br/api/v1/localidades/estados', 'GET').then((data) => {
      const newUfList = [];
      for (const key in data) {
        const newUF = data[key] as UFDefinition;
        newUfList.push(newUF.sigla);
      }
      setUfList(newUfList);
    });
    setMap(map);
  };

  // Carrega o tipo de conta que o usuário atual possui.
  const loadUserAccount = () => {
    RequestMaker.MakeRequest(`${process.env.REACT_APP_BACKEND_URL}/getAccountType`, 'POST', {
      email: currentUser?.email,
    })
      .then((data) => {
        setAccountType(data.tipo as string);
        setLoading(false);
      })
      .catch(() => {
        firebase.auth().signOut();
      });
  };

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
      return;
    }

    loadUserAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, history]);

  return scope == 'PACIENTES' ? (
    <DashboardContainer>
      <PopUpHandler
        buttons={popupData.buttons}
        shown={popupData.shown}
        title={popupData.title}
        text={popupData.text}
        type={popupData.type}
      />
      <LoadingScreen shown={loading} />
      <Navbar
        callbackSetPacientes={() => setScope('PACIENTES')}
        callbackSetFuncionarios={() => setScope('FUNCIONARIOS')}
        account={accountType == 'MEDICO' ? 'MÉDICO' : 'ENFERMEIRO'}
        active={'PACIENTES'}
      />
      {map == {} || ufList == [] ? <></> : <LeafletMap ufs={ufList} map={map} />}
      <p style={{ textAlign: 'center' }}>
        <DefaultButton onClick={showAddPatient}>➕ Adicionar um paciente</DefaultButton>
      </p>
      <h1 style={{ margin: '2em 0 0.5em 0' }}>😷 Todos os pacientes</h1>
      <PatientTable list={patientListCallback} key={reloadCounter} />
    </DashboardContainer>
  ) : (
    <DashboardContainer>
      <PopUpHandler
        buttons={popupData.buttons}
        shown={popupData.shown}
        title={popupData.title}
        text={popupData.text}
        type={popupData.type}
      />
      <LoadingScreen shown={loading} />
      <Navbar
        callbackSetPacientes={() => setScope('PACIENTES')}
        callbackSetFuncionarios={() => setScope('FUNCIONARIOS')}
        account={accountType == 'MEDICO' ? 'MÉDICO' : 'ENFERMEIRO'}
        active={'FUNCIONÁRIOS'}
      />
      <p style={{ textAlign: 'center' }}>
        <DefaultButton onClick={showAddProfessional}>➕ Adicionar um funcionário</DefaultButton>
      </p>
      <h1 style={{ margin: '2em 0 0.5em 0' }}>👩‍⚕️ Todos os funcionários</h1>
      <ProfessionalTable key={reloadCounter} />
    </DashboardContainer>
  );
});
