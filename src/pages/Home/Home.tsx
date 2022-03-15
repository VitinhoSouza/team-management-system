import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';

import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import { RootState } from '../../store/storeConfig';
import ModalAddPlayer from '../../components/Modal/Modal';

import plusIcon from '../../assets/plus.svg'

import './Home.scss';


type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
}


export function Home(){
    const dispatch = useDispatch();
    const authState:any = useSelector<RootState>(state => state.auth);

    const [modalIsOn, setModalIsOn] = useState(false);

    function toggleModal(){
        if(modalIsOn === true){
            setModalIsOn(false);
        }else{
            setModalIsOn(true);
        }
    }

    function createPlayer(player:IPlayerProps){
        console.log("Criando ", player );
    }

    function searchPlayerByName(playerName:string){
        console.log("Pesquisando ", playerName );
    }

    function searchMorePlayers(){
        console.log("Pesquisando mais..." );
    }
    
    return(
        <div className="homeContainer">
            {modalIsOn && (
                <ModalAddPlayer toggleModal={toggleModal} 
                                confirm={createPlayer} 
                                actionButton="Create"
                                title="Creating a player"
                />
            )}

            <div className='searchPlayer'>
                <span>Search players by name:</span>
                <input type="text" id="text" 
                    placeholder="Enter the name of the player you want to search for"
                    onInput={(e:any)=>searchPlayerByName(e.target.value)}
                />
            </div>

            <div className="playerCards">
                
                <PlayerCard age={22} level={4} name='Vitinho' position="MC" 
                    imgUrl="http://4.bp.blogspot.com/_i-KuDcuQjJE/TL2j2aCHpXI/AAAAAAAAAeg/e7e8GF2gy38/s1600/vitinho_picnik.jpg"/>
                
                <PlayerCard age={30} level={5} name='Neymar Jr' position="PE" 
                    imgUrl="https://www.ofutebolero.com.br/__export/1623535297137/sites/elfutboleromx/img/2021/06/12/neymar-brasil-argentina-16-10-2018_16iqsksvwzw5w107ek63d4fnst.jpg_1720385577.jpg" />

                <PlayerCard age={30} level={5} name='Neymar Jr' position="PE" 
                    imgUrl="https://www.ofutebolero.com.br/__export/1623535297137/sites/elfutboleromx/img/2021/06/12/neymar-brasil-argentina-16-10-2018_16iqsksvwzw5w107ek63d4fnst.jpg_1720385577.jpg" />
                
                <PlayerCard age={30} level={5} name='Neymar Jr' position="PE" 
                    imgUrl="https://www.ofutebolero.com.br/__export/1623535297137/sites/elfutboleromx/img/2021/06/12/neymar-brasil-argentina-16-10-2018_16iqsksvwzw5w107ek63d4fnst.jpg_1720385577.jpg" />
                
                <button className="button-addPlayer" onClick={toggleModal}>
                    <span> Create a new player</span>
                    <img src={plusIcon} alt="" />
                </button>

            </div>

            <div className='pagination' onClick={searchMorePlayers} >
                <span>Click here to search more</span>
            </div>
            
        </div>
    )
}