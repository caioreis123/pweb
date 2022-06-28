
import {useState, useContext, useEffect} from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { FiSettings, FiUpload } from 'react-icons/fi';
import axios from 'axios';
import {serverUrl} from "../../contexts/config";
import {cloudName, upload_preset} from "../../services/cloudinaryConfig";

export default function Profile(){
  const { user, signOut} = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email] = useState(user.email);
  const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        axios.get(`${serverUrl}/user/${email}`)
            .then(response => {
                if (response.data.name) setNome(response.data.name);
                if(response.data.avatarUrl) setAvatarUrl(response.data.avatarUrl);
            });
    }, [email]);


 async function handleUpdateUserData(e){
    e.preventDefault();
    const userData = {
        name: nome,
        email,
        avatarUrl
    }
    axios.put(serverUrl + '/user', userData)
        .then(response => {
            if(response.status === 200) alert('Dados do usuário atualizados com sucesso!');
            else alert('Erro ao atualizar dados do usuário: ' + response.data.message);
        })
  }

  async function handleUploadAvatarImage(file){
    const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', upload_preset)
      data.append('cloud_name', cloudName)
      axios.post(cloudUrl, data)
          .then(response => {
              console.log("upload de imagem realizado")
              setAvatarUrl(response.data.url)
              console.log(response);
          })
        .catch(error => alert('Erro ao subir imagem: ' + error.message))
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

              <input type="file" accept="image/*" onChange={e => handleUploadAvatarImage(e.target.files[0])}/><br/>
              { avatarUrl === '' ?
                <img src={avatar} width="250" height="250" alt="Foto de perfil do usuario" />
                :
                <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuario" />
              }
            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={ (e) => {
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