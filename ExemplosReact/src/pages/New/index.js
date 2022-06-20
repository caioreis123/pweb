import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './new.css';
import firebase from '../../services/firebaseConnection';
import axios from "axios";
import {serverUrl} from "../../contexts/config";

export const STATUS = {
    EM_ABERTO: 'EM_ABERTO',
    EM_PROGRESSO: 'EM_PROGRESSO',
    ATENDIDO: 'ATENDIDO',
};

const ASSUNTO = {
    SUPORTE: 'SUPORTE',
    FINANCEIRO: 'FINANCEIRO',
    VISITA: 'VISITA',
}

export default function New() {



    const [clientes, setClientes] = useState([]);
    const [loadingClientes, setLoadingClientes] = useState(true);
    const [clienteSelecionado, setClienteSelecionado] = useState(0);
    const [assunto, setAssunto] = useState(ASSUNTO.SUPORTE);
    const [status, setStatus] = useState(STATUS.EM_ABERTO);
    const [complemento, setComplemento] = useState('');


    useEffect(() => {
        axios.get(`${serverUrl}/client`)
            .then(response => {
                if(response.status === 200) {
                    setClientes(response.data)
                    setLoadingClientes(false)
                }
            })

    }, []);

    async function criarChamado(e) {
        e.preventDefault();
        const chamadoData = {
            client: clientes[clienteSelecionado],
            assunto,
            status,
            complemento,
            dataDeCadastro: new Date().toISOString().split('T')[0], //ex: 2022-06-18
        }
        await axios.post(serverUrl + '/chamado', chamadoData)
            .then(response => alert('Chamado criado com sucesso!'))
            .catch(error => alert('Erro ao criar chamado: ' + error.message))
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title nome="Novo chamado">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">

                    <form onSubmit={(e) =>  criarChamado(e)} className="form-profile">
                        <label>Cliente</label>
                        {clientes ?
                            <select value={clienteSelecionado} onChange={(e) => {
                                setClienteSelecionado(e.target.value)
                            }}>
                                {clientes.map((item, index) => {
                                    return (<option key={item.cnpj} value={index}>{item.name}</option>);
                                })}
                            </select>
                            :
                            <input type="text" value="Carregando..." />
                        }


                        <label>Assunto</label>
                        <select value={assunto} onChange={(e) => {
                            setAssunto(e.target.value)
                        }}>
                            <option value={ASSUNTO.SUPORTE}>Suporte</option>
                            <option value={ASSUNTO.FINANCEIRO}>Financeiro</option>
                            <option value={ASSUNTO.VISITA}>Visita</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value={STATUS.EM_ABERTO}
                                onChange={(e) => {
                                    setStatus(e.target.value)
                                }}
                                checked={status === STATUS.EM_ABERTO} />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name="radio"
                                value={STATUS.EM_PROGRESSO}
                                onChange={(e) => {
                                    setStatus(e.target.value)
                                }}
                                checked={status === STATUS.EM_PROGRESSO} />
                            <span>Em Progresso</span>

                            <input
                                type="radio"
                                name="radio"
                                value={STATUS.ATENDIDO}
                                onChange={(e) => {
                                    setStatus(e.target.value)
                                }}
                                checked={status === STATUS.ATENDIDO} />
                            <span>Atendido</span>
                        </div>
                        <label>Complemento</label>
                        <textarea type="text"
                            placeholder="Descreva seu problema aqui"
                            value={complemento}
                            onChange={(e) => {
                                setComplemento(e.target.value)
                            }} />

                        <button type="submit">Registrar</button>
                    </form>

                </div>

            </div>
        </div>
    );
}