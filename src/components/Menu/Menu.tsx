import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import history from "../../../history";

export function Menu () {

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
                <NavLink exact to="/">Página Inicial</NavLink>
                <NavLink to="/products"
                    > Gerenciar Produtos</NavLink>
                <NavLink to="/categories" activeStyle={{backgroundColor:"#5A2626"}}
                    > Gerenciar Categorias</NavLink>
                <div>Configurações</div>
                <div onClick={toggleModal}>Sair</div>
            </nav>
        </div>
    )
}