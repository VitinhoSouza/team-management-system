import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../services/firebase";
import { child, get, getDatabase, ref } from "firebase/database";

import { RootState } from "../../store/storeConfig";
import logoStar from '../../assets/star.svg';
import { IconEdit } from '../../assets/components/iconEdit';
import { IconDelete } from "../../assets/components/iconDelete";
import { ModalDeleteTeam, ModalEditTeam } from "../ModalTeams/ModalTeams";
import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import { changeUser } from "../../store/Auth/auth.action";
import { changePopUp } from "../../store/PopUp/popUp.action";
import { sortArray } from "../../utils";
import {ITeamProps, IPlayerProps} from "../../utils";

import './TeamCard.scss';

export function TeamCard({id,idPlayers,name,idCaptain,uid}:ITeamProps){

    const dispatch = useDispatch();
    const userState:any = useSelector<RootState>(state => state.auth.user);

    const [modalDeleteIsOn, setModalDeleteIsOn] = useState(false);
    const [modalEditIsOn, setModalEditIsOn] = useState(false);

    const [players,setPlayers] = useState<IPlayerProps[]>([]);

    function toggleModalEdit(){
        if(modalEditIsOn === true){
            setModalEditIsOn(false);
        }else{
            setModalEditIsOn(true);
        }
    }

    function toggleModalDelete(){
        if(modalDeleteIsOn === true){
            setModalDeleteIsOn(false);
        }else{
            setModalDeleteIsOn(true);
        }
    }

    function editTeam(team:ITeamProps){
        toggleModalEdit();

        dispatch(changePopUp(false,"","",""));

        deleteTeam();

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userState.id}/players`)).then((result) => {
            const userRef = database.ref('users/'+userState.id+'/teams');
            userRef.push({
                id: team.id,
                idPlayers: team.idPlayers,
                name: team.name,
                idCaptain: team.idCaptain,
                uid:uid
            })
            
            dispatch(changePopUp(true,"Success","The team was updated.",""));
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
        }).catch((error) => {
            console.error(error);
            dispatch(changePopUp(true,"Error","Unable to update team!",""));
        });
    }

    async function deleteTeam(){
        await database.ref(`users/${userState.id}/teams/${uid}`).remove()
        .then(() => {
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
            dispatch(changePopUp(true,"Success","The team was deleted.",""));
        }).catch((error) => {
            console.error(error);
            dispatch(changePopUp(true,"Error","Unable to delete team!",""));
        });
    }

    function mountStars(){
        let totalStars = 0;
        let totalStarsInt;
        players.forEach((player:IPlayerProps)=>{
            if(idPlayers.includes(player.id))
                totalStars += player.level;
        })
        totalStars = totalStars / (idPlayers.length);
        totalStarsInt = parseInt(totalStars.toFixed());

        let aux = 0;
        let array = [];
        while(aux < totalStarsInt){
            array.push(aux)
            aux += 1;
        }
        return(
            array.map(star => {
                return <img src={logoStar} alt={`star${star}${name}`} key={`star${star}${name}`}/>
            })
            
        )
    }

    useEffect(()=>{
        if(userState.id !== undefined && userState.id !== ''){
            let playersForUser:Array<IPlayerProps> = [];
            const userRef = database.ref(`users/${userState.id}/players`);
            userRef.once('value',user =>{
                let playersWithId = undefined;
                if(user.val() !== null)
                    playersWithId = Object.entries(user.val());
            
                playersWithId !== null && playersWithId !== undefined &&
                    playersWithId.forEach((playerWithId:any) => {
                        playersForUser.push({
                            uid:playerWithId[0],age:playerWithId[1].age,
                            level:playerWithId[1].level,name:playerWithId[1].name,
                            position:playerWithId[1].position,
                            id:playerWithId[1].id,img:playerWithId[1].img
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

    function mountPlayers(){
        let isCaptain = false;
        return(
            players.map((player:IPlayerProps) => {
                isCaptain =  idCaptain === player.id ? true : false;
                return(
                    !(idPlayers.includes(player.id)) ? (<></>):
                        (
                            <PlayerCard 
                                age={player.age} id={player.id}
                                level={player.level} name={player.name} 
                                position={player.position}
                                isCaptain={isCaptain} WithinATeam={true}
                                key={player.id}
                                img={player.img}
                            />
                        )
                )
            })
            
        )
    }


    return(
        <div className='teamCard'>
            {modalEditIsOn && (
                <ModalEditTeam toggleModal={toggleModalEdit} 
                                confirm={editTeam} 
                                team={
                                    {id,idPlayers,name,idCaptain}
                                }
                />
            )}

            {modalDeleteIsOn && (
                <ModalDeleteTeam toggleModal={toggleModalDelete} 
                                confirm={()=>{toggleModalDelete();deleteTeam()}} 
                                idTeam={id} nameTeam={name}
                />
            )}

            <i onClick={toggleModalDelete} className="delete"> 
                <IconDelete color='#009000' width={"3rem"} height={"3rem"}/> 
            </i>

            <div className="initCard">
                <div className="nameIcon">
                    <h1>#{id} - {name}</h1>
                    <i onClick={toggleModalEdit} className="edit"> 
                        <IconEdit color='#009000' width={"1.8rem"} height={"1.8rem"}/> 
                    </i>
                </div>
                <h3>{mountStars()}</h3>
            </div>
            <div className='teamPlayers'>
                {mountPlayers()}
            </div>
            
        </div>
    )
}