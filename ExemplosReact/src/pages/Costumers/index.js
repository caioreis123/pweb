import { useState, useEffect } from 'react';
import { FiUser, FiDelete,FiEdit2 } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './costumers.css'
// import {useContext} from "@types/react";
import {AuthContext} from "../../contexts/auth";
import {serverUrl} from "../../contexts/config";
import axios from "axios";

export default function Costumers() {
    const [clientName, setClientName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [address, setAddress] = useState('');
    const [clientes, setClientes] = useState([]);

    useEffect(()=>{
        axios.get(`${serverUrl}/client`)
            .then(response => {
                if(response.status === 200) setClientes(response.data);
                console.log(response.data);
            })
    },[clientes]);

    function criarCliente(e){
        e.preventDefault();
        const clientData ={
            name: clientName,
            cnpj,
            address,
            timeOfRegistration: new Date().toISOString().split('T')[0], //ex: 2022-06-18
        }
        axios.post(serverUrl + '/client', clientData)
            .then(response => {
                if(response.status === 200) alert('Cliente cadastrado com sucesso!');
                else alert('Erro ao criar cliente: ' + response.data.message);
            })
    }

    async function exlcluir(id){
        
     }

    return (
        <div>
            <Header />

            <div className="content">
                <Title nome="Clientes">
                    <FiUser size={25} />
                </Title>


                <div className="container">
                    <form onSubmit={(e)=>{criarCliente(e)}} className="form-profile costumers">
                        <label>Nome</label>
                        <input placeholder="Digite o Nome Fantasia" type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />

                        <label>CNPJ</label>
                        <input placeholder="Digite o CNPJ" type="text" value={cnpj} onChange={(e) => { setCnpj(e.target.value) }} />

                        <label>Endereço</label>
                        <input placeholder="Digite o seu Endereço" type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} />

                        <button className="button-costumers" type="submit">Salvar</button>
                    </form>
                </div>
                <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">CNPJ</th>
                  <th scope="col">Endereço</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                  {clientes.map((cliente)=>{
                      return(
                        <tr>
                        <td data-label="Cliente">{cliente.name}</td>
                        <td data-label="CNPJ">{cliente.cnpj}</td>
                        <td data-label="Endereço">{cliente.address}</td>
                        <td data-label="Cadastrado">20/06/2021</td>
                        <td data-label="#">
                          <button onClick={()=>{exlcluir(cliente.id)}} className="action" style={{backgroundColor: '#3583f6' }}>
                            <FiDelete color="#FFF" size={17} />
                          </button>
                          <button className="action" style={{backgroundColor: '#F6a935' }}>
                            <FiEdit2 color="#FFF" size={17} />
                          </button>
                        </td>
                      </tr>
                      );
                  })}
                
              </tbody>
            </table>
            </div>
        </div>
    );
}