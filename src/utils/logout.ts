import history from "../history";
import { auth } from "../services/firebase";

export function logout(){
    console.log('tentando');
    auth.signOut();
    history.push('/');
}