import { useState } from "react";
import logoStar from '../../assets/star.svg';
import { IconEdit } from '../../assets/components/iconEdit';
import { ModalEditPlayer } from '../ModalPlayers/ModalPlayers';

import './PlayerCard.scss';

type IPlayerProps = {
    id:number
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
}


export function PlayerCard({imgUrl,name,age,position,level,id}:IPlayerProps){

    const [modalEditIsOn, setModalEditIsOn] = useState(false);

    function toggleModalEdit(){
        if(modalEditIsOn === true){
            setModalEditIsOn(false);
        }else{
            setModalEditIsOn(true);
        }
    }

    function editPlayer(player:IPlayerProps){
        console.log("Editando o jogador",player)
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
            <img className='photoPlayer' src={imgUrl} alt="Player photo" />
            <i onClick={toggleModalEdit}> <IconEdit color='white' width={"1.5rem"} height={"1.5rem"}/> </i>
            <div className='infoPlayer'>
                <h2>{name}</h2>
                <h3>{age} years</h3>
                <h3>{position}</h3>
                <h3>{mountStars()}</h3>
            </div>
            
        </div>
    )
}