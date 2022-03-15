import { useState } from "react";
import logoStar from '../../assets/star.svg';
import { IconEdit } from '../../assets/components/iconEdit';
import { PlayerCard } from "../../components/PlayerCard/PlayerCard";
import players from '../../assets/jsons/players.json'
// import { ModalEditPlayer } from '../ModalPlayers/ModalPlayers';

import './TeamCard.scss';

type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
    id:number
}

type ITeamProps = {
    idPlayers: Array<number>
    name: string
    idCaptain: number
}

export function TeamCard({idPlayers,name,idCaptain}:ITeamProps){

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

    // function mountStars(){
    //     let totalStars = 0;
    //     players.forEach((player:IPlayerProps)=>{
    //         totalStars += player.level;
    //     })
    //     totalStars = totalStars / players.length;
    //     console.log("estrelas", totalStars);

    //     let aux = 0;
    //     let array = [];
    //     while(aux < level){
    //         array.push(aux)
    //         aux += 1;
    //     }
    //     return(
    //         array.map(star => {
    //             return <img src={logoStar} alt={`star${star}${name}`} key={`star${star}${name}`}/>
    //         })
            
    //     )
    // }

    function mountPlayers(){
        return(
            players.map((player:any) => {
                return(
                    !(idPlayers.includes(player.id)) ? (<></>):
                        (
                            <>
                                <PlayerCard 
                                    age={player.age} id={player.id} imgUrl={player.imgUrl}
                                    level={player.level} name={player.name} 
                                    position={player.position}
                                />
                                {idCaptain === player.id ? <div className="captain">©</div> : ''}
                            </>
                        )
                )
            })
            
        )
    }


    return(
        <div className='teamCard'>
            {/* {mountStars} */}
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
                <h3>{name}</h3>
                {/* <h3>{mountStars()}</h3> */}
                <i /* onClick={toggleModalEdit} */> <IconEdit color='white' width={"1.5rem"} height={"1.5rem"}/> </i>
            </div>
            <div className='teamPlayers'>
                {mountPlayers()}
            </div>
            
        </div>
    )
}