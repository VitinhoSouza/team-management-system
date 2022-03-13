import { useState } from "react";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../utils'

import { RootState } from '../../store/storeConfig';

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
        logout();
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

            <nav>
                <NavLink exact to="/home">Página Inicial</NavLink>
                <NavLink to="/products"
                    > Gerenciar Produtos</NavLink>
                <NavLink to="/categories" activeStyle={{backgroundColor:"#5A2626"}}
                    > Gerenciar Categorias</NavLink>
                <div>Configurações</div>
                <button onClick={tryLogout}>Sair</button>
            </nav>
        </div>
    )
}