import {useDispatch} from 'react-redux';

import {auth, firebase} from '../../services/firebase'
import history from '../../history'
import {changeUser} from "../../store/Auth/auth.action"

import logoGoogle from '../../assets/logo-google.svg'
import field3 from '../../assets/field3.jpg'
import ball from '../../assets/soccer-ball.svg'
import './Login.scss'

export function Login(){

    const dispatch = useDispatch();

    function signWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result =>{
                if(result.user){
                    const {displayName,photoURL,uid} = result.user;
                    if(!displayName || !photoURL){
                        throw new Error('Missing Information from Google Account.');
                    }
                    dispatch(changeUser(uid,displayName,photoURL));
                    history.push("/home");
                }
            })
    }

    return(
        <div className='pageLogin'>
            <img className="img-ball" src={ball} alt="" />
            <img className="img-ball2" src={ball} alt="" />
            <img className="photoField" src={field3} alt="" />
            <div className='content'>
                <div className='texts'>
                    <h1>Team Management System</h1>
                    <h2>Manage players and teams with this platform and have fun!</h2>
                </div>
                
                <button className='buttonGoogle' onClick={signWithGoogle}>
                    <img src={logoGoogle} alt="" />
                    <span>
                        Login with your Google account
                    </span>
                    
                </button>
            </div>
            
        </div>
    )
}