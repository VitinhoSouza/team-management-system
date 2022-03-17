import { useState } from "react";
import logoStar from '../../assets/star.svg';
import { IconDelete } from '../../assets/components/iconDelete';
import { IconEdit } from '../../assets/components/iconEdit';
import { ModalDeletePlayer, ModalEditPlayer } from '../ModalPlayers/ModalPlayers';

import './PlayerCard.scss';
import { child, get, getDatabase, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/storeConfig";
import { database } from "../../services/firebase";
import { changeUser } from "../../store/Auth/auth.action";
import { changePopUp } from "../../store/PopUp/popUp.action";

type IPlayerProps = {
    uid?:any
    id:number
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
    isCaptain?:boolean
    WithinATeam?:boolean
}


export function PlayerCard({imgUrl,name,age,position,level,id,uid,isCaptain,WithinATeam}:IPlayerProps){

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
        console.log("Editando o jogador",player);
        toggleModalEdit();
        
        dispatch(changePopUp(false,"","",""));

        deletePlayer();

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userState.id}/players`)).then((result) => {
            const userRef = database.ref('users/'+userState.id+'/players');
            const firebaseUser = userRef.push({
                imgUrl:player.imgUrl,
                name: player.name.toLocaleUpperCase(),
                age: player.age,
                position: player.position,
                level: player.level,
                id:player.id,
                uid:uid
            })
            
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
        }).catch((error) => {
            console.error(error);
        });
    }

    async function deletePlayer(){
        const userRef = await database.ref(`users/${userState.id}/players/${uid}`).remove()
        .then(() => {
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
        }).catch((error) => {
            console.error(error);
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
                                    {imgUrl,name,age,position,level,id}
                                }
                />
            )}

            {modalDeleteIsOn && (
                <ModalDeletePlayer toggleModal={()=>{toggleModalDelete();toggleModalDelete();}} 
                                confirm={deletePlayer} 
                                idPlayer={id} namePlayer={name}
                />
            )}
            <img className='photoPlayer' src={imgUrl} alt="Player photo" />
       
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
                        <h2 id="captain">#{id} - {name} C</h2>
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