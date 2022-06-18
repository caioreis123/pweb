
import {useState, useContext, useEffect} from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { FiSettings, FiUpload } from 'react-icons/fi';
import axios from 'axios';
import {serverUrl} from "../../contexts/config";

export default function Profile(){
  const { user, signOut} = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email] = useState(user.email);
  const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        console.log("atualizou")
        axios.get(`${serverUrl}/user/${email}`)
            .then(response => {
                if (response.data.name) setNome(response.data.name);
                if(response.data.avatarUrl) setAvatarUrl(response.data.avatarUrl);
            });
    }, []);


 async function handleUpdateUserData(e){
    e.preventDefault();
    const userData = {
        name: nome,
        email,
        avatarUrl
    }
    axios.put(serverUrl + '/user', userData)
        .then(response => {
            console.log(response);
            alert('Dados atualizados com sucesso!');
        })
  }

  async function handleUploadAvatarImage(){
   
  }

  return(
    <div>
      <Header/>
      <div className="content">
        <Title nome="Meu perfil">
          <FiSettings size={25} />
        </Title>
        <div className="container">
          <form onSubmit={(e)=>handleUpdateUserData(e)} className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#000" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleUploadAvatarImage}/><br/>
              { avatarUrl === '' ?
                <img src={avatar} width="250" height="250" alt="Foto de perfil do usuario" />
                :
                <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuario" />
              }
            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={ (e) => {
                console.log(e.target.value)
                setNome(e.target.value)
            } } />

            <label>Email</label>
            <input type="text" placeholder={email} disabled={true} />

            <button type="submit">Salvar</button>       

          </form>
        </div>

        <div className="container">
            <button className="logout-btn" onClick={ () => signOut() } >
               Sair
            </button>
        </div>

      </div>
    </div>
  )
}