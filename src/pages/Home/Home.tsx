import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';

import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import { RootState } from '../../store/storeConfig';
import ModalAddPlayer from '../../components/ModalPlayers/ModalPlayers';
import { changePopUp } from '../../store/PopUp/popUp.action';
import { database } from '../../services/firebase';
import { getDatabase, ref, child, get } from "firebase/database";

import plusIcon from '../../assets/plus.svg';

import './Home.scss';
import { changeUser } from '../../store/Auth/auth.action';

type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
    id:number
    uid?:any
}


export function Home(){

    const dispatch = useDispatch();
    const userState:any = useSelector<RootState>(state => state.auth.user);

    const [modalCreateIsOn, setModalCreateIsOn] = useState(false);
    const [players,setPlayers] = useState<IPlayerProps[]>([]);

    const sortArray = (a:any, b:any) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {  
          return -1;
        }
        return 0;
    };

    function toggleModalCreate(){
        if(modalCreateIsOn === true){
            setModalCreateIsOn(false);
        }else{
            setModalCreateIsOn(true);
        }
    }

    function createPlayerDB(player:IPlayerProps){
        
        dispatch(changePopUp(false,"","",""));

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userState.id}/players`)).then((result) => {

            let lastElement:any;
            let newIdPlayer = 1;
            if(result.val() !== null && Object.keys(result.val()).length > 0){ 
                lastElement = Object.values(result.val())[ Object.values(result.val()).length -1];
                newIdPlayer = lastElement.id + 1;
            }
            const userRef = database.ref('users/'+userState.id+'/players');
            const firebaseUser = userRef.push({
                imgUrl:player.imgUrl,
                name: player.name.toLocaleUpperCase(),
                age: player.age,
                position: player.position,
                level: player.level,
                id:newIdPlayer
            })
            
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
        }).catch((error) => {
            console.error(error);
        });

    }

    function searchPlayerByName(playerName:string){
        if(playerName !== ""){
            let playersFound = players.filter(player => player.name.includes(playerName.toLocaleUpperCase()))
            setPlayers(playersFound);
        }else{
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
        }
    }

    /* function searchMorePlayers(value:string){
        console.log("Pesquisando mais..." );
    } */
    
    function mountPlayers(){
        
        return(
            players.map((player:IPlayerProps) => {
                return <PlayerCard 
                        age={player.age} id={player.id} imgUrl={player.imgUrl}
                        level={player.level} name={player.name} 
                        position={player.position} 
                        key={`player#${player.uid}`}
                        uid={player.uid}
                    />
            })
            
        )
    }

    useEffect(()=>{
        if(userState.id !== undefined && userState.id !== ''){
            let playersForUser:Array<IPlayerProps> = [];
            const userRef = database.ref(`users/${userState.id}/`);
            userRef.once('value',user =>{
                let playersAux2 = undefined;
                if(user.val() !== null && user.val()?.players === undefined){
                    let playersAux:any = Object.entries(user.val())[0][1];
                    playersAux2 = Object.entries(playersAux);
                }
                let playersWithId:any = playersAux2 !== undefined ? playersAux2[0][1] : user.val()?.players;
                playersWithId !== null && playersWithId !== undefined &&
                    Object.entries(playersWithId).forEach((playerWithId:any) => {
                        playersForUser.push({
                            uid:playerWithId[0],age:playerWithId[1].age,imgUrl:playerWithId[1].imgUrl,
                            level:playerWithId[1].level,name:playerWithId[1].name,position:playerWithId[1].position,
                            id:playerWithId[1].id,
                        });
                    })
                
                playersForUser.sort(sortArray);
                setPlayers(playersForUser);
            })
            return ()=>{
                userRef.off('value');
            }
        }

    },[userState])

    return(
        <div className="homeContainer">
            {modalCreateIsOn && (
                <ModalAddPlayer toggleModal={toggleModalCreate} 
                                confirm={createPlayerDB} 
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