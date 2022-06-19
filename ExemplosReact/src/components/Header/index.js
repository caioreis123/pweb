import './header.css'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'
import {useContext} from "react";
import {AuthContext} from "../../contexts/auth";
import {useEffect, useState} from "react";
import axios from "axios";
import {serverUrl} from "../../contexts/config";

function Header() {
    const { user } = useContext(AuthContext);
    const [avatarUrl, setAvatarUrl] = useState();

    useEffect(() => {
        console.log("rodou ela")
        axios.get(`${serverUrl}/user/${user.email}`)
            .then(response => {
                if(response.data.avatarUrl) setAvatarUrl(response.data.avatarUrl);
                console.log(response.data.avatarUrl);
            });
    }, [avatar]);

    return (
        <div className="sidebar">
            <div>
                <img alt="Foto Avatar" src={avatarUrl?avatarUrl:avatar}/>
            </div>
            <Link to="/dashboard">
                <FiHome color="#FFF" size={24} />
            Chamados
        </Link>
            <Link to="/costumers">
                <FiUser color="#FFF" size={24} />
            Clientes
        </Link>
            <Link to="/profile">
                <FiSettings color="#FFF" size={24} />
            Configurações
        </Link>

        </div>
    );
}
export default Header;