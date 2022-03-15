import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';

import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import { RootState } from '../../store/storeConfig';
import ModalAddPlayer from '../../components/ModalPlayers/ModalPlayers';

import plusIcon from '../../assets/plus.svg'
import players from '../../assets/jsons/players.json'

import './Home.scss';


type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
}


export function Home(){
    /* const dispatch = useDispatch();
    const authState:any = useSelector<RootState>(state => state.auth); */

    const [modalCreateIsOn, setModalCreateIsOn] = useState(false);

    function toggleModalCreate(){
        if(modalCreateIsOn === true){
            setModalCreateIsOn(false);
        }else{
            setModalCreateIsOn(true);
        }
    }

    function createPlayer(player:IPlayerProps){
        console.log("Criando ", player );
    }

    function searchPlayerByName(playerName:string){
        console.log("Pesquisando ", playerName );
    }

    /* function searchMorePlayers(){
        console.log("Pesquisando mais..." );
    } */
    
    function mountPlayers(){
        return(
            players.map((player:any) => {
                return <PlayerCard 
                        age={player.age} id={player.id} imgUrl={player.imgUrl}
                        level={player.level} name={player.name} 
                        position={player.position}
                    />
            })
            
        )
    }

    return(
        <div className="homeContainer">
            {modalCreateIsOn && (
                <ModalAddPlayer toggleModal={toggleModalCreate} 
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
                
                {/* <PlayerCard age={22} level={4} name='Vitinho' position="MC" id={1}
                    imgUrl="http://4.bp.blogspot.com/_i-KuDcuQjJE/TL2j2aCHpXI/AAAAAAAAAeg/e7e8GF2gy38/s1600/vitinho_picnik.jpg"/>
                
                <PlayerCard age={30} level={5} name='Neymar Jr' position="PE" id={2}
                    imgUrl="https://www.ofutebolero.com.br/__export/1623535297137/sites/elfutboleromx/img/2021/06/12/neymar-brasil-argentina-16-10-2018_16iqsksvwzw5w107ek63d4fnst.jpg_1720385577.jpg" />
 */}

                {mountPlayers()}

                <button className="button-addPlayer" onClick={toggleModalCreate}>
                    <span> Create a new player</span>
                    <img src={plusIcon} alt="" />
                </button>

            </div>

            {/* <div className='pagination' onClick={searchMorePlayers} >
                <span>Click here to search more</span>
            </div> */}
            
        </div>
    )
}