import {initializeApp} from "firebase/app"
import{getAuth} from "firebase/auth"
import {firebaseConfig} from "./firebaseConfig";

const app=initializeApp(firebaseConfig);
var auth=null;
if(app){
    auth=getAuth();
}

export default auth;