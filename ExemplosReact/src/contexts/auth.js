import { useState, createContext, useEffect } from 'react'
import firebase from '../services/firebaseConnection'
import { toast } from 'react-toastify';
export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        function loadUser() {
            const storagedUser = localStorage.getItem("usuarioLogado");
            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
                //setLoading(true);
            }
            //setLoading(false);
        }
        loadUser();
    }, []);

    async function signUp(email, password, nome) {
        setLoading(true);
        //Criar usario no Firebase baseado no email e senha e Salvador em um banco mysql

    }

    async function signIn(email, password) {
        
        
        setLoading(true);
        //Fazer Login no firebase
        toast.success('Bem-vindo de volta!!');
        
    }


    async function signOut() {
        //Fazer logout no firebase
    }

    function setLocalUser(data){
        localStorage.setItem('usuarioLogado', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signUp,
            signOut,
            signIn,
            loading,
            setUser,
            setLocalUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;