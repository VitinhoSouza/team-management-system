import { useState } from "react";
import logoStar from '../../assets/star.svg';
import { IconEdit } from '../../assets/components/iconEdit';
import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import players from '../../assets/jsons/players.json'
// import { ModalEditPlayer } from '../ModalPlayers/ModalPlayers';

import './TeamCard.scss';
import { IconDelete } from "../../assets/components/iconDelete";
import { ModalDeleteTeam } from "../ModalTeams/ModalTeams";

type ITeamProps = {
    id: number
    idPlayers: Array<number>
    name: string
    idCaptain: number
}

export function TeamCard({id,idPlayers,name,idCaptain}:ITeamProps){

    const [modalDeleteIsOn, setModalDeleteIsOn] = useState(false);
    /* const [modalEditIsOn, setModalEditIsOn] = useState(false);

    function toggleModalEdit(){
        if(modalEditIsOn === true){
            setModalEditIsOn(false);
        }else{
            setModalEditIsOn(true);
        }
    } */

    function toggleModalDelete(){
        if(modalDeleteIsOn === true){
            setModalDeleteIsOn(false);
        }else{
            setModalDeleteIsOn(true);
        }
    }

    function editTeam(team:ITeamProps){
        console.log("Editando o time",team)
        // toggleModalEdit();
    }

    function deleteTeam(){
        console.log("deletando o team de id",id);
        toggleModalDelete();
    }

    function mountStars(){
        let totalStars = 0;
        let totalStarsInt;
        players.forEach((player:any)=>{
            totalStars += player.level;
        })
        totalStars = totalStars / players.length;
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

    function mountPlayers(){
        let isCaptain = false;
        return(
            players.map((player:any) => {
                isCaptain =  idCaptain === player.id ? true : false;
                return(
                    !(idPlayers.includes(player.id)) ? (<></>):
                        (
                            <PlayerCard 
                                age={player.age} id={player.id} imgUrl={player.imgUrl}
                                level={player.level} name={player.name} 
                                position={player.position}
                                isCaptain={isCaptain} WithinATeam={true}
                            />
                        )
                )
            })
            
        )
    }


    return(
        <div className='teamCard'>
            {/* {modalEditIsOn && (
                <ModalEditPlayer toggleModal={toggleModalEdit} 
                                confirm={editPlayer} 
                                actionButton="Edit"
                                title="Editing the player"
                                player={
                                    {imgUrl,name,age,position,level}
                                }
                />
            )} */}

            {modalDeleteIsOn && (
                <ModalDeleteTeam toggleModal={toggleModalDelete} 
                                confirm={deleteTeam} 
                                idTeam={id} nameTeam={name}
                />
            )}

            <i onClick={toggleModalDelete} className="delete"> 
                <IconDelete color='#009000' width={"3rem"} height={"3rem"}/> 
            </i>

            <div className="initCard">
                <div className="nameIcon">
                    <h1>#{id} - {name}</h1>
                    <i /* onClick={toggleModalEdit} */ className="edit"> 
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