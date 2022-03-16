import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';

import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import { RootState } from '../../store/storeConfig';
import ModalAddPlayer from '../../components/ModalPlayers/ModalPlayers';

import plusIcon from '../../assets/plus.svg'
import players from '../../assets/jsons/players.json'

import './Home.scss';
import { changePopUp } from '../../store/PopUp/popUp.action';
import { database } from '../../services/firebase';
import { getDatabase, ref, child, get,onValue } from "firebase/database";
import { changePlayers } from '../../store/Players/players.action';


type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
    id:number
}

type IHome = {
    playersState: Array<IPlayerProps>
}
export function Home({playersState}:IHome){
    const dispatch = useDispatch();
    const userState:any = useSelector<RootState>(state => state.auth.user);

    const [modalCreateIsOn, setModalCreateIsOn] = useState(false);

    function toggleModalCreate(){
        if(modalCreateIsOn === true){
            setModalCreateIsOn(false);
        }else{
            setModalCreateIsOn(true);
        }
    }

    function createPlayer(player:IPlayerProps){
        dispatch(changePopUp(false,"","",""));

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userState.id}`)).then((result) => {
            if(result.val() !== null && result.val().players !== undefined)
                console.log("VER.ID",Object.keys(result.val().players).length);
            let newIdPlayer = 
                (result.val() !== null && result.val().players !== undefined && 
                    Object.keys(result.val().players).length > 0) ? 
                Object.keys(result.val().players).length + 1 : 1;
            
            const userRef = database.ref('users/'+userState.id+'/players');
            const firebaseUser = userRef.push({
                imgUrl:player.imgUrl,
                name: player.name,
                age: player.age,
                position: player.position,
                level: player.level,
                id:newIdPlayer
            })
            window.location.reload();
            // getPlayerDB();
        }).catch((error) => {
            console.error(error);
        });

    }

    function searchPlayerByName(playerName:string){
        console.log("Pesquisando ", playerName );
    }

    /* function searchMorePlayers(){
        console.log("Pesquisando mais..." );
    } */

    async function getPlayerDB(){
        let playersForUser:Array<any> = [];
        const db = getDatabase();
        const starCountRef = ref(db, `users/${userState.id}`);
        await onValue(starCountRef, (result) => {
            let playersAux2 = undefined;
            if(result.val() !== null && result.val()?.players === undefined){
                let playersAux:any = Object.entries(result.val())[0][1];
                playersAux2 = Object.entries(playersAux);
            }
            let playersWithId:any = playersAux2 !== undefined ? playersAux2[0][1] : result.val()?.players;
            let vexes = 0;
            playersWithId !== null && playersWithId !== undefined &&
                Object.entries(playersWithId).forEach((playerWithId:any) => {
                    console.log("ELEMENTO ",vexes,playerWithId[1]);
                    playersForUser.push(playerWithId[1])
                    vexes += 1;
                })
            // console.log("SETANDO DEPOIS DE GET-->",Object.entries(playersWithId).length);
            dispatch(changePlayers(playersForUser));
        })
    }
    
    function mountPlayers(){
        
        console.log("MONTANDO");
        return(
            playersState.map((player:IPlayerProps) => {
                return <PlayerCard 
                        age={player.age} id={player.id} imgUrl={player.imgUrl}
                        level={player.level} name={player.name} 
                        position={player.position} key={`player#${player.id}`}
                    />
            })
            
        )
    }

    useEffect(()=>{
        getPlayerDB();
    },[])

    useEffect(()=>{
        console.log("ALTEROU",playersState);
        // mountPlayers();
    },[playersState])

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