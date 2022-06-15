import { useState, useEffect } from 'react';
import { FiUser, FiDelete,FiEdit2 } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './costumers.css'
export default function Costumers() {

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [clientes, setClientes] = useState([]);

    useEffect(()=>{
        async function loadClientes() {
            
        }
        loadClientes();
    },[clientes]);

    function handleSubmit(e){
        e.preventDefault();
        
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
                    <form onSubmit={(e)=>{handleSubmit(e)}} className="form-profile costumers">
                        <label>Nome</label>
                        <input placeholder="Digite o Nome Fantasia" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>CNPJ</label>
                        <input placeholder="Digite o CNPJ" type="text" value={cnpj} onChange={(e) => { setCnpj(e.target.value) }} />

                        <label>Endereço</label>
                        <input placeholder="Digite o seu Endereço" type="text" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} />

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
                        <td data-label="Cliente">{cliente.nome}</td>
                        <td data-label="CNPJ">{cliente.cnpj}</td>
                        <td data-label="Endereço">{cliente.endereco}</td>
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