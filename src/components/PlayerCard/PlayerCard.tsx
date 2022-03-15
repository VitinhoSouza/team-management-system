import { useState } from "react";
import logoStar from '../../assets/star.svg';
import { IconDelete } from '../../assets/components/iconDelete';
import { IconEdit } from '../../assets/components/iconEdit';
import { ModalDeletePlayer, ModalEditPlayer } from '../ModalPlayers/ModalPlayers';

import './PlayerCard.scss';

type IPlayerProps = {
    id:number
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
    isCaptain?:boolean
    WithinATeam?:boolean
}


export function PlayerCard({imgUrl,name,age,position,level,id,isCaptain,WithinATeam}:IPlayerProps){

    const [modalEditIsOn, setModalEditIsOn] = useState(false);
    const [modalDeleteIsOn, setModalDeleteIsOn] = useState(false);
    // const [playerToBeDeleted, setPlayerToBeDeleted] = useState<IPlayerProps>();

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
        console.log("Editando o jogador",player)
    }

    function deletePlayer(){
        console.log("deletando o jogador de id",id);
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
                <ModalDeletePlayer toggleModal={toggleModalDelete} 
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