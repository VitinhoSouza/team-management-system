import {Router, Route} from 'react-router-dom'
import history from './history'
import { Menu } from "./components/Menu/Menu";
import { Login } from "./pages/Login/Login";
import { Home } from './pages/Home/Home';
import { RootState } from './store/storeConfig';
import { useEffect } from 'react';
import { auth } from './services/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {changeUser} from "./store/Auth/auth.action"
import PopUp from './components/PopUp/PopUp';
import { changePopUp } from './store/PopUp/popUp.action';
import Footer from './components/Footer/Footer';

import "./App.scss"

function App() {

  const dispatch = useDispatch();
  const popUpState:any = useSelector<RootState>(state => state.popUp);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        const {displayName,photoURL,uid} = user;
        if(!displayName || !photoURL){
            throw new Error('Missing Information from Google Account.');
        }
        dispatch(changeUser(uid,displayName,photoURL));
        if(history.location.pathname === '/'){
          history.push("/home");
          /* dispatch(changePopUp(true,"Error","Unauthorized access!",
          "To access the home screen you need to login with a google account.")) */
        }
      }
      else if(history.location.pathname === '/home'){
        // console.log(history, "tentou /home");
        history.push("/");
        /* dispatch(changePopUp(true,"Error","Unauthorized access!",
          "To access the home screen you need to login with a google account.")) */
      }
    })

    return () => {
      unsubscribe();
    }
    /* if(VerifyLogin() === false && history.location.pathname === '/home')
      history.push("/");
    else if(VerifyLogin() === true && history.location.pathname === '/')
      history.push("/home"); */
  },[])

  function closePopUp(){
    dispatch(changePopUp(false,"","",""));                                                
  }

  return (
    <Router history={history}>

        <PopUp type={popUpState.type} 
              isVisible={popUpState.status}   
              message={popUpState.message}
              submessage={popUpState.submessage}
              functionClosePopUp={closePopUp}
        />

      <Route exact path="/">
        <Login/>
      </Route>

      <Route path="/home">
        <div className='pageHome'>
          <Menu/>
          <Home/>
          <Footer/> 
        </div>
      </Route>

      <Route path="/teams">
        <div className='pageTeams'>
          <Menu/>
          <div>TEAMS</div>
          <Footer/> 
        </div>
      </Route>

    </Router>
  );
}

export default App;
