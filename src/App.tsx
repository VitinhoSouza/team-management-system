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
        if(history.location.pathname === '/')
          history.push("/home");
      }
      else if(history.location.pathname === '/home'){
        history.push("/");
        throw new Error('Unauthorized access.');
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
    dispatch(changePopUp("NotVisible","","",""));                                                
  }

  return (
    <Router history={history}>

        <PopUp type={popUpState.type} 
              status={popUpState.status} functionClosePopUp={closePopUp}  
              message={popUpState.message}
              submessage={popUpState.submessage}
        />

      <Route exact path="/">
        <Login/>
      </Route>

      <Route path="/home">
        <Menu/>
        <Home/> 
      </Route>

    </Router>
  );
}

export default App;
