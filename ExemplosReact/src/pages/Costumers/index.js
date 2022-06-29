import { useState, useEffect } from 'react';
import { FiUser, FiDelete, FiEdit2, FiCheck } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './costumers.css'
import {serverUrl} from "../../contexts/config";
import axios from "axios";

export default function Costumers() {
    const [clientName, setClientName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [address, setAddress] = useState('');
    const [clientes, setClientes] = useState([]);
    const [clienteEditavelCnpj, setClienteEditavelCnpj] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedAddress, setUpdatedAddress] = useState('');

    function listarCLientes() {
        axios.get(`${serverUrl}/client`)
            .then(response => {
                if (response.status === 200) {
                    setClientes(response.data)
                }
            })
            .catch(error => {
                console.log(error)
                alert('Erro ao buscar clientes: ' + error.message)
            })
    }

    useEffect(()=>{
        listarCLientes();
    },[]);

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
                console.log(response)
                if(response.status === 200) {
                    setClientes([...clientes, response.data])
                    alert('Cliente cadastrado com sucesso!')
                }
                else alert('Erro ao criar cliente: ' + response.data.message);
            })
    }

    async function removerCliente(cnpj){
        axios.delete(`${serverUrl}/client/${cnpj}`)
            .then(response => {
                console.log(response)
                listarCLientes()
            })
            .catch(error => {
                alert('Erro ao remover cliente: ' + error.message)
            })
    }

    function atualizarCliente(cliente) {
        axios.patch(`${serverUrl}/client`, cliente)
            .then( r => listarCLientes())
            .catch(error => alert('Erro ao atualizar cliente: ' + error.message))
    }

    function editarCliente(cliente) {
        if(cliente.cnpj === clienteEditavelCnpj) {
            const clienteAtualizado = {
                cnpj: cliente.cnpj,
                name: updatedName || cliente.name,
                address: updatedAddress || cliente.address,
            }
            atualizarCliente(clienteAtualizado);
            setClienteEditavelCnpj(null)
        }
        else {
            setClienteEditavelCnpj(cliente.cnpj);
            setUpdatedName(cliente.name);
            setUpdatedAddress(cliente.address);
        }
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
                        <tr key={cliente.cnpj}>
                            {cliente.cnpj === clienteEditavelCnpj ?
                                <td>
                                    <input className="editable-cell" type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                                </td>
                                : <td data-label="Cliente">{cliente.name}</td>}
                        <td data-label="CNPJ">{cliente.cnpj}</td>
                            {cliente.cnpj === clienteEditavelCnpj ?
                               <td>
                                   <input className="editable-cell" type="text" value={updatedAddress} onChange={(e) => setUpdatedAddress(e.target.value)} />
                               </td>
                                : <td data-label="Endereço">{cliente.address}</td>}
                        <td data-label="Cadastrado">20/06/2021</td>
                        <td data-label="#">
                          <button onClick={()=>{removerCliente(cliente.cnpj)}} className="action" style={{backgroundColor: '#3583f6' }}>
                            <FiDelete color="#FFF" size={17} />
                          </button>
                          <button onClick={()=>editarCliente(cliente)} className="action" style={{backgroundColor: '#F6a935' }}>
                              {cliente.cnpj === clienteEditavelCnpj ? <FiCheck color="green" size={17}/>: <FiEdit2 color="#FFF" size={17}/>}
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