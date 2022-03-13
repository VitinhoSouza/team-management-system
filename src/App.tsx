import {Router, Route, Redirect} from 'react-router-dom'
import history from './history'
import { Menu } from "./components/Menu/Menu";
import { Login } from "./pages/Login/Login";
import { Home } from './pages/Home/Home';

function App() {
  return (
    <Router history={history}>

      <Route path="/login">
        <Login/>
      </Route>

      <Route exact path="/">
        <Menu/>
        <Home/> 
      </Route>

    </Router>
  );
}

export default App;
