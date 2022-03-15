import { useState } from "react";
import logoStar from '../../assets/star.svg';
import { IconEdit } from '../../assets/components/iconEdit';
import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import players from '../../assets/jsons/players.json'
// import { ModalEditPlayer } from '../ModalPlayers/ModalPlayers';

import './TeamCard.scss';
import { IconDelete } from "../../assets/components/iconDelete";

type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
    id:number
}

type ITeamProps = {
    id: number
    idPlayers: Array<number>
    name: string
    idCaptain: number
}

export function TeamCard({id,idPlayers,name,idCaptain}:ITeamProps){

    /* const [modalEditIsOn, setModalEditIsOn] = useState(false);

    function toggleModalEdit(){
        if(modalEditIsOn === true){
            setModalEditIsOn(false);
        }else{
            setModalEditIsOn(true);
        }
    } */

    function editTeam(team:ITeamProps){
        console.log("Editando o time",team)
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
            <div className="initCard">
                <div className="nameIcons">
                    <h1>#{id} - {name}</h1>
                    <div className="icons">
                        <i /* onClick={toggleModalEdit} */ className="delete"> 
                            <IconDelete color='#009000' width={"3rem"} height={"3rem"}/> 
                        </i>
                        <i /* onClick={toggleModalEdit} */ className="edit"> 
                            <IconEdit color='#009000' width={"1.8rem"} height={"1.8rem"}/> 
                        </i>
                    </div>
                </div>
                <h3>{mountStars()}</h3>
            </div>
            <div className='teamPlayers'>
                {mountPlayers()}
            </div>
            
        </div>
    )
}