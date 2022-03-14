import { useState } from "react";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import history from "../../history";

import { RootState } from '../../store/storeConfig';
import { auth } from "../../services/firebase";
import {IconLogout} from "../../assets/components/iconLogout"
import ball from '../../assets/soccer-ball.svg'

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

    /* function activeProducts(){
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
        <div className="containerMenu">

            {modalIsOn && (
                <div className="overlay">
                    <div className="modal">
                        <h1>Are you sure you want to log out of the system?</h1>
                        <div className="buttonsModal">
                            <button onClick={toggleModal}>Cancel</button>
                            <button onClick={tryLogout}>Yes, I want out!</button>
                        </div>
                    </div>
                </div>  
            )}

            <img src={ball} alt="" className="soccerBall-menu" />

            <nav className="menu">
                <div className="start">
                    <NavLink className="navlink" exact to="/home"><span>Players</span> </NavLink>
                    <NavLink className="navlink" id="central" to="/teams"> <span>Teams</span> </NavLink>
                </div>
                
                <div className="navlink" id="last" onClick={toggleModal}>
                    <IconLogout width={"1.5rem"} height={"1.5rem"} color={"white"}/>
                </div>
            </nav>
        </div>
    )
}