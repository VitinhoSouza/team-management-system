import { useState } from "react";
import { child, get, getDatabase, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/storeConfig";
import { database } from "../../services/firebase";
import { changeUser } from "../../store/Auth/auth.action";
import { changePopUp } from "../../store/PopUp/popUp.action";
import { IconDelete } from '../../assets/components/iconDelete';
import { IconEdit } from '../../assets/components/iconEdit';
import { ModalDeletePlayer, ModalEditPlayer } from '../ModalPlayers/ModalPlayers';
import {IPlayerProps} from "../../utils";

import logoStar from '../../assets/star.svg';

import './PlayerCard.scss';

export function PlayerCard({name,age,position,level,id,uid,
                            isCaptain,WithinATeam, img}:IPlayerProps){

    const [modalEditIsOn, setModalEditIsOn] = useState(false);
    const [modalDeleteIsOn, setModalDeleteIsOn] = useState(false);

    const dispatch = useDispatch();
    const userState:any = useSelector<RootState>(state => state.auth.user);

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


    function editPlayer(player:IPlayerProps){
        toggleModalEdit();
        
        dispatch(changePopUp(false,"","",""));

        deletePlayer();

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userState.id}/players`)).then((result) => {
            const userRef = database.ref('users/'+userState.id+'/players');
            userRef.push({
                name: player.name.toLocaleUpperCase(),
                age: player.age,
                position: player.position,
                level: player.level,
                id:player.id,
                uid:uid,
                img: player.img !== undefined && typeof player.img !== 'string' &&
                    URL.createObjectURL(player.img)
            })
            
            dispatch(changePopUp(true,"Success","The player was updated.",""));
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
        }).catch((error) => {
            console.error(error);
            dispatch(changePopUp(true,"Error","Unable to update player!",""));
        });
    }

    async function deletePlayer(){
        await database.ref(`users/${userState.id}/players/${uid}`).remove()
        .then(() => {
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
            dispatch(changePopUp(true,"Success","The player was deleted.",""));
        }).catch((error) => {
            console.error(error);
            dispatch(changePopUp(true,"Error","Unable to delete player!",""));
        });
    }

    function mountStars(){
        let aux = 0;
        let array = [];
        while(aux < level){
            array.push(aux)
            aux += 1;
        }
        return(
            array.map(star => {
                return <img src={logoStar} alt={`star${star}${name}`} key={`star${star}${name}`}/>
            })
            
        )
    }

    return(
        <div className='playerCard'>
            {modalEditIsOn && (
                <ModalEditPlayer toggleModal={toggleModalEdit} 
                                confirm={editPlayer} 
                                actionButton="Edit"
                                title="Editing the player"
                                player={
                                    {name,age,position,level,id,img}
                                }
                />
            )}

            {modalDeleteIsOn && (
                <ModalDeletePlayer toggleModal={()=>{toggleModalDelete();toggleModalDelete();}} 
                                confirm={deletePlayer} 
                                idPlayer={id} namePlayer={name}
                />
            )}

            {typeof img === 'string' ?
                <img className='photoPlayer' src={img} alt="Player" />
                : <img className='photoPlayer' src="" alt="Player" />}
       
            {WithinATeam === true ? (
                <>
                </>
            ):(
                <>
                    <i className="delete" onClick={toggleModalDelete}> 
                        <IconDelete color='white' width={"2.5rem"} height={"2.5rem"}/> 
                    </i>
                    <i className="edit" onClick={toggleModalEdit}> 
                        <IconEdit color='white' width={"1.5rem"} height={"1.5rem"}/> 
                    </i>
                </>
            )
            }
         
            <div className='infoPlayer' id={WithinATeam === true ? "withinATeam" : ""}>
                <div className="nameCaptain">
                    {isCaptain ? (
                        <h2 id="captain">#{id} - {name} (C)</h2>
                    ):(
                        <h2>#{id} - {name} </h2>
                    )}
                </div>
                <h3>{age} years</h3>
                <h3>{position}</h3>
                <h3>{mountStars()}</h3>
            </div>
            
        </div>
    )
}