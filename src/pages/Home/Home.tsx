import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';

import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import { RootState } from '../../store/storeConfig';
import ModalAddPlayer from '../../components/ModalPlayers/ModalPlayers';

import plusIcon from '../../assets/plus.svg'
import players from '../../assets/jsons/players.json'

import './Home.scss';
import { changePopUp } from '../../store/PopUp/popUp.action';


type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
    id:number
}

export function Home(){
    const dispatch = useDispatch();

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
        dispatch(changePopUp(false,"","",""));
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