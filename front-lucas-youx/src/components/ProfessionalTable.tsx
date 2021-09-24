import { useEffect, useState } from 'react';
import { Formatter } from '../classes/Formatter';
import { RequestMaker } from '../classes/RequestMaker';
import firebase from 'firebase/app';
import { Professional } from '../interfaces/ProfessionalRecord';

export function ProfessionalTable(): JSX.Element {
  const [professionalsTable, setProfessionalsTable] = useState([<></>]);

  useEffect(() => {
    load_professionals();
  }, []);

  // Carrega os pacientes do banco de dados.
  const load_professionals = async () => {
    RequestMaker.MakeRequest(`${process.env.REACT_APP_BACKEND_URL}/getProfessionals`, 'POST', {
      email: firebase.auth().currentUser?.email,
    })
      .then((data) => {
        const newProfessionals = [];
        for (const key in data) {
          const professional = data[key] as Professional;

          newProfessionals.push(
            <>
              <td>{professional.sequencia}</td>
              <td>{professional.nome}</td>
              <td>{professional.email}</td>
              <td>{new Formatter().FormatCPF(professional.cpf)}</td>
              <td>{professional.hash_cpf}</td>
              <td>{professional.senha}</td>
              <td>{professional.hash_senha}</td>
              <td>{professional.tipo}</td>
            </>,
          );
        }

        setProfessionalsTable(newProfessionals);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <p>
        Aqui se encontram todos os profissionais cadastrados no sistema. É importante lembrar que, assim que um novo for
        adicionado, a lista já será atualizada automaticamente.<br></br>Os campos com (Para Avaliação) jamais deveriam
        ser mostrados nessa tabela. Eles servem apenas para mostrar o pessoal da YouX sobre o quesito de encriptação.
      </p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>CPF Hash (Para Avaliação)</th>
            <th>Senha (Para Avaliação)</th>
            <th>Senha Hash (Para Avaliação)</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {professionalsTable.map((professional, index) => (
            <tr className={index % 2 == 1 ? 'row_alternate' : ''} key={index}>
              {professional}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
