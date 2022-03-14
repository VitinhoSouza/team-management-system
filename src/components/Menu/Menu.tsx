import { useState } from "react";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import history from "../../history";

import { RootState } from '../../store/storeConfig';
import { auth } from "../../services/firebase";
// import iconLogout from "../../assets/logout.svg";
import {IconLogout} from "../../assets/components/iconLogout"

import "./Menu.scss"

export function Menu () {

    const dispatch = useDispatch();
    const authState:any = useSelector<RootState>(state => state.auth);

    /* const {setNavActive,setSearchByIdActive} = useContext(Context);
    const {setAuth} = useContext(AuthContext); */
    const [modalIsOn, setModalIsOn] = useState(false);

    function toggleModal(){
        if(modalIsOn === true){
            setModalIsOn(false);
        }else{
            setModalIsOn(true);
        }
    }

    /* function getOut(){
        setAuth({token:null});
        history.push("/login");
    }

    function activeProducts(){
        setNavActive("products");
        setSearchByIdActive(false);
    }
    function activeCategories(){
        setNavActive("categories");
        setSearchByIdActive(false);
    } */

    function tryLogout(){
        auth.signOut()
            .then( () => {
                history.push('/');
            })
            .catch(() =>{
                throw new Error('Unable to log out.');
            })
    
    }
    return(
        <div>

            {/* {modalIsOn && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <h1>Tem certeza que deseja sair do sistema?</h1>
                        <div>
                            <button onClick={toggleModal}>Não, continuar no sistema.</button>
                            <button onClick={getOut}>Sim, sair!</button>
                        </div>
                    </div>
                </div>  
            )} */}

            <nav className="menu">
                <div className="start">
                    <NavLink className="navlink" exact to="/home"><span>Players</span> </NavLink>
                    <NavLink className="navlink" id="central" to="/teams" activeStyle={{backgroundColor:"#5A2626"}}
                        > <span>Teams</span> </NavLink>
                </div>
                
                <div className="navlink" id="last" onClick={tryLogout}>
                    <IconLogout width={"1.5rem"} height={"1.5rem"} color={"white"}/>
                </div>
            </nav>
        </div>
    )
}