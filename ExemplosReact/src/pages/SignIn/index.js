import './signin.css'
import logo from '../../assets/login.png'
import {Link, useNavigate} from 'react-router-dom'
import { useState,useContext } from 'react';
import {AuthContext} from "../../contexts/auth";

function SignIn() {
    const {logIn} = useContext(AuthContext);
    const navigateTo = useNavigate();

    const [email, setEmail]=useState('');
    const [senha, setSenha]=useState('');

    function handleSubmit(e){
      e.preventDefault();
          logIn(email, senha)
              .then(() => navigateTo("/dashboard"))
              .catch(error => alert(error.message));

    }

    return (
      <div className="conteiner-center">
        <div className="login">
          
          <div className="login-area">
            <img src={logo} alt="Logo do Sistema"/>
          </div>
         
          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input type="text" value={email} placeholder="email@email.com"  onChange={(e)=>{setEmail(e.target.value)}} />

            <input type="password" value={senha} placeholder="*****" onChange={(e)=>{setSenha(e.target.value)}}/>
            <button type="submit">Acessar</button>
          </form>
         
          <Link to="/register">Criar uma conta</Link>
       
        </div>
      </div>
    );
  }
  
  export default SignIn;