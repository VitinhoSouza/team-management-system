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

function App() {

  const dispatch = useDispatch();
  const authState:any = useSelector<RootState>(state => state.auth);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        const {displayName,photoURL,uid} = user;
        if(!displayName || !photoURL){
            throw new Error('Missing Information from Google Account.');
        }
        dispatch(changeUser(uid,displayName,photoURL));
      }
    })

    return () => {
      unsubscribe();
    }
  },[])

  console.log(authState.user);

  if(authState.user.id !== '' && history.location.pathname === '/')
    history.push("/home");

  return (
    <Router history={history}>

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
