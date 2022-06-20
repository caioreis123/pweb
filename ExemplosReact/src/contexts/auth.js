import { useState, createContext, useEffect } from 'react'
import auth from "../services/firebaseConnection";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import axios from "axios";
import {serverUrl} from "./config";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    async function signUp(email, password) {
        await createUserWithEmailAndPassword(auth, email, password)
        await axios.post(serverUrl + '/user', {email});
    }

    async function logIn(email, password) {
        await signInWithEmailAndPassword(auth, email, password);
    }

    async function logOut() {
        return await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            signUp,
            logIn,
            logOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;