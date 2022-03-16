
import plusIcon from '../../assets/plus.svg'
import { TeamCard } from '../../components/TeamCard/TeamCard';

import teams from '../../assets/jsons/teams.json'

import './Teams.scss';
import { useState } from 'react';
import ModalAddTeam from '../../components/ModalTeams/ModalTeams';

type ITeamProps = {
    id: number
    idPlayers: Array<number>
    name: string
    idCaptain: number
}

export function Teams(){

    const [modalCreateIsOn, setModalCreateIsOn] = useState(false);

    function toggleModalCreate(){
        if(modalCreateIsOn === true){
            setModalCreateIsOn(false);
        }else{
            setModalCreateIsOn(true);
        }
    }

    function createTeam(team:ITeamProps){
        console.log("Criando ", team );
        // dispatch(changePopUp(false,"","",""));
    }

    function searchTeamByName(teamName:string){
        console.log("Pesquisando ", teamName );
    }

    function mountTeams(){
        return(
            teams.map((team:any) => {
                return <TeamCard 
                            id={team.id}
                            idCaptain={team.idCaptain}
                            name={team.name}
                            idPlayers={team.idPlayers}
                        />
            })
            
        )
    }

    return(
        <div className="teamsContainer">

            {modalCreateIsOn && (
                <ModalAddTeam toggleModal={toggleModalCreate} 
                                confirm={createTeam}
                />
            )}

            <div className='searchTeam'>
                <span>Search teams by name:</span>
                <input type="text" id="text" 
                    placeholder="Enter the name of the team you want to search for"
                    onInput={(e:any)=>searchTeamByName(e.target.value)}
                />
            </div>

            <div className="teamsCards">
                {mountTeams()}
                <button className="button-addTeam" onClick={toggleModalCreate}>
                    <span> Create a new team</span>
                    <img src={plusIcon} alt="" />
                </button>

            </div>
            
        </div>
    )
}