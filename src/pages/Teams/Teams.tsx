
import plusIcon from '../../assets/plus.svg'
import { TeamCard } from '../../components/TeamCard/TeamCard';

import teams from '../../assets/jsons/teams.json'

import './Teams.scss';

export function Teams(){

    function searchTeamByName(teamName:string){
        console.log("Pesquisando ", teamName );
    }

    function mountTeams(){
        return(
            teams.map((team:any) => {
                return <TeamCard 
                        idCaptain={team.idCaptain}
                        name={team.name}
                        idPlayers={team.idPlayers}
                    />
            })
            
        )
    }

    return(
        <div className="teamsContainer">
            {/* {modalCreateIsOn && (
                <ModalAddPlayer toggleModal={toggleModalCreate} 
                                confirm={createPlayer} 
                                actionButton="Create"
                                title="Creating a player"
                />
            )} */}

            <div className='searchTeam'>
                <span>Search teams by name:</span>
                <input type="text" id="text" 
                    placeholder="Enter the name of the team you want to search for"
                    onInput={(e:any)=>searchTeamByName(e.target.value)}
                />
            </div>

            <div className="teamsCards">
                {mountTeams()}
                <button className="button-addTeam"/*  onClick={toggleModalCreate} */>
                    <span> Create a new team</span>
                    <img src={plusIcon} alt="" />
                </button>

            </div>
            
        </div>
    )
}