import { useEffect, useState } from 'react';
import { Formatter } from '../classes/Formatter';
import { RequestMaker } from '../classes/RequestMaker';
import { Patient } from '../interfaces/PatientRecord';
import { UFListCallbackProps } from '../interfaces/UFListCallbackProps';

export const PatientTable: React.FC<UFListCallbackProps> = (props: UFListCallbackProps) => {
  const [patientsTable, setPatientsTable] = useState([<></>]);

  useEffect(() => {
    load_patients();
    // eslint-disable-next-line
  }, []);

  // Carrega os pacientes do banco de dados.
  const load_patients = async () => {
    const patient_count: Record<string, number> = {};

    RequestMaker.MakeRequest(`${process.env.REACT_APP_BACKEND_URL}/getPatients`, 'GET')
      .then((data) => {
        const newPatients = [];
        for (const key in data) {
          const patient = data[key] as Patient;

          if (patient.uf in patient_count) {
            patient_count[patient.uf]++;
          } else {
            patient_count[patient.uf] = 1;
          }

          newPatients.push(
            <>
              <td>{patient.sequencia}</td>
              <td>{patient.nome}</td>
              <td>{new Formatter().FormatCPF(patient.cpf)}</td>
              <td>{patient.hash_cpf}</td>
              <td>{patient.nascimento == '00/00/0000' ? '-' : patient.nascimento}</td>
              <td>{patient.uf}</td>
              <td>{patient.peso == 0 ? '-' : new Formatter().FormatWeight(patient.peso.toString())}</td>
              <td>{patient.altura == 0 ? '-' : new Formatter().FormatHeight(patient.altura.toString())}</td>
            </>,
          );
        }

        props.list(patient_count);
        setPatientsTable(newPatients);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <p>
        Aqui se encontram todos os pacientes cadastrados no sistema. É importante lembrar que, assim que um novo for
        adicionado, a lista já será atualizada automaticamente.<br></br>Os campos com (Para Avaliação) jamais deveriam
        ser mostrados nessa tabela. Eles servem apenas para mostrar o pessoal da YouX sobre o quesito de encriptação.
      </p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>CPF Hash (Para Avaliação)</th>
            <th>Nascimento</th>
            <th>UF</th>
            <th>Peso</th>
            <th>Altura</th>
          </tr>
        </thead>
        <tbody>
          {patientsTable.map((patient, index) => (
            <tr className={index % 2 == 1 ? 'row_alternate' : ''} key={index}>
              {patient}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
