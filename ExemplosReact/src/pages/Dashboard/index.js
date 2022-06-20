
import './dashboard.css';
import {useEffect, useState} from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from "axios";
import {serverUrl} from "../../contexts/config";
import {Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, RadioGroup, Radio} from '@mui/material'
import {STATUS} from "../New";

export default function Dashboard(){
  const [chamados, setChamados] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [novoStatus, setNovoStatus] = useState(null);
  const [chamadoASerAtualizado, setChamadoASerAtualizado] = useState(null);

    useEffect(() => {
        axios.get(serverUrl + '/chamado')
        .then(response => {
            if(response.status === 200) setChamados(response.data);
            else console.log('Erro ao carregar chamados');
        })
    }, []);

    function atualizarStatus() {
        chamadoASerAtualizado.status = novoStatus;
        console.log(chamadoASerAtualizado);
        axios.patch(serverUrl + '/chamado/', chamadoASerAtualizado)
            .catch(error => alert(error.message));
    }

    return(
    <div>
      <Header/>

      <div className="content">
        <Title nome="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
        )  : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
              {chamados.map((chamado) => {
                  return (
                      <tr key={chamado.id}>
                          <td data-label="Cliente">{ chamado.client.name }</td>
                          <td data-label="Assunto">{ chamado.assunto }</td>
                          <td data-label="Status">
                        <span
                            className="badge"
                            style={
                                chamado.status === 'EM_ABERTO' ?
                                    { backgroundColor: '#bf2d17' } :
                                    chamado.status === 'EM_PROGRESSO' ?
                                        { backgroundColor: '#c2b43c' } :
                                        { backgroundColor: '#5cb85c'}
                            }
                        >
                          { chamado.status }
                        </span>
                          </td>
                          <td data-label="Cadastrado">{ chamado.dataDeCadastro }</td>
                          <td data-label="#">
                              <Dialog open={isDialogOpen}>
                                    <DialogTitle>Qual o novo status?</DialogTitle>
                                    <DialogContent>
                                        <RadioGroup row name="status" onChange={(e) => setNovoStatus(e.target.value)}>
                                            <div><Radio value={STATUS.EM_ABERTO} /> Em Aberto</div>
                                            <div><Radio value={STATUS.EM_PROGRESSO} /> Em Progresso</div>
                                            <div><Radio value={STATUS.ATENDIDO} /> Atendido</div>
                                        </RadioGroup>
                                        <DialogActions>
                                            <button onClick={()=> {
                                                setIsDialogOpen(false)
                                                atualizarStatus();
                                            }}>Confirmar</button>
                                        </DialogActions>
                                    </DialogContent>
                              </Dialog>
                              <button className="action" style={{backgroundColor: '#3583f6' }}>
                                  <FiSearch color="#FFF" size={17} />
                              </button>
                              <button onClick={()=> {
                                  setChamadoASerAtualizado(chamado)
                                  setIsDialogOpen(true)
                              }} className="action" style={{backgroundColor: '#F6a935' }}>
                                  <FiEdit2 color="#FFF" size={17} />
                              </button>
                          </td>
                      </tr>
                  )
              })}
              </tbody>
            </table>
          </>
        )}

      </div>

    </div>
  )
}