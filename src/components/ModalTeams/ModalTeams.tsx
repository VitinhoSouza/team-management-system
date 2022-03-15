
import { useState } from "react";
import { useDispatch } from "react-redux";
import iconClose from "../../assets/close.svg";

import players from "../../assets/jsons/players.json";
import { changePopUp } from "../../store/PopUp/popUp.action";

import './ModalTeams.scss';

type ITeamProps = {
    id: number
    idPlayers: Array<number>
    name: string
    idCaptain: number
}


type IModalAdd = {
    toggleModal:() => void;
    confirm:(team:ITeamProps) => void;
}

type IModalDelete = {
    toggleModal:() => void;
    confirm:() => void;
    idTeam: number;
    nameTeam: string;
}

const ModalAddTeam = ({toggleModal,confirm}:IModalAdd) => {

    const dispatch = useDispatch();

    const [newName,setNewName] = useState<string>("");
    const [newIdCaptain,setNewIdCaptain] = useState<number>(1);
    const [newPlayers,setNewPlayers] = useState<Array<string>>([]);

    function isSelectedCaptain(value:number){
        if(value === newIdCaptain)
            return true;
        return false;
    }

    function isSelectedPlayer(value:string){
        if(newPlayers.includes(value)){
            return true;
        }
        return false;
    }

    function changeInfoNewTeam(prop:string,value:string|number){
    
        if(prop === 'name' && typeof value === 'string')
            setNewName(value);
        else if(prop === 'idCaptain' && typeof value === 'number')
            setNewIdCaptain(value);
        else if(prop === 'players' && typeof value === 'string'){
            let playersAux = newPlayers;
            if(isSelectedPlayer(value)){
                let index = playersAux.indexOf(value);
                playersAux.splice(index,1);
            }
            else{
                playersAux.push(value);
            }
                
            setNewPlayers(playersAux);
        }
    }

    function onlyCharSpace(value:string){
        for (var i = 0; i < value.length; i++) {
            if(value[i] != " ")
                return false;
        }
        return true;
    }
    

    function validateTeam(){
        if(onlyCharSpace(newName))
            dispatch(changePopUp(true,"Error","Unable to create team","Fill in the fields correctly"))
        else{
            confirm({
                id:3,
                idCaptain:newIdCaptain,
                idPlayers: [1,2,3],
                name:newName
            })
            toggleModal();
        }
    }

    function mountPlayersSelected(){
        let completedString:string = "";
        players.map((player:any)=>{
            if(isSelectedPlayer(player.id.toString()))
                completedString += player.name;
        })
        return(
            <span>
                {completedString.substr(0,20)}...
            </span>
        )
    }
                      
    {/* if(typeof row[element] === 'string' && row[element].length > 40) {
        return (
            <td>{`${row[element].substr(0,40)}...`}</td>
        )
    } */}

    return(
        <div className="overlayTeam">
            <div className="modalTeam">
                <header className="header">
                    <div className="getout" onClick={toggleModal}>
                        <img src={iconClose} alt="" />
                    </div>
                    <span className="title">Creating a team</span>
                </header>
                <main className="form">
                    <div className="info">
                        <span className="title">Enter team name: </span>
                        <input type="text" name="" id="" className="inputForm" 
                            value={newName} 
                            onChange={(e:any)=>changeInfoNewTeam("name",e.target.value)}/>
                    </div>
                
    
                    <div className="info">
                        <span className="title">Choose your team captain: </span>
                        <select name="select" className="inputForm" id="selectCaptain" 
                            value={newIdCaptain} 
                            onInput={(e:any)=>changeInfoNewTeam("idCaptain",parseInt(e.target.value))} >
                            { players.map((player:any)=>{
                                return <option value={player.id} selected={isSelectedCaptain(player.id)}>
                                            #{player.id} - {player.name}
                                        </option>
                            })

                            }
                        </select>
                    </div>

                    <div className="info">
                        <span className="title">Choose your team's players: </span>
                        
                        <div className="inputForm" id="inputForPlayers">

                            <div className="valuesSelected">
            
                                {mountPlayersSelected()}
                                
                            </div>                            

                            {players.map((player:any)=>{
                                    return (
                                        // <li
                                        //     key={`selectPlayers_${player.id}`}
                                        //     tabIndex={0}
                                        //     onClick={() => changeInfoNewTeam("players",player.id.toString())}
                                        // >
                                        <>
                                            <input
                                                type="checkbox"
                                                name={`selectPlayers_${player.id}`}
                                                // checked={isSelectedPlayer(player.id.toString())}
                                                aria-checked={isSelectedPlayer(player.id.toString())}
                                                id={`selectPlayers_${player.id}`} tabIndex={-1}
                                                onChange={() => changeInfoNewTeam("players",player.id.toString())}
                                            />
                                            <label htmlFor={`selectPlayers_${player.id}`}>
                                                #{player.id} - {player.name}
                                            </label>

                                        </>
                                    )}
                                )
                            }
                        </div>
                    </div>
                </main>
                <footer className="buttonsModal-component">
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={validateTeam}>Create</button>
                </footer>
            </div>
        </div>
    )
}

export const ModalDeleteTeam = ({toggleModal,confirm,idTeam,nameTeam}:IModalDelete) => {

    return(
        <div className="overlayTeam">
            <div className="modalTeam" id="modalDelete">
                <header className="header">
                    <div className="getout" onClick={toggleModal}>
                        <img src={iconClose} alt="" />
                    </div>
                    <span className="title">Deleting a team</span>
                </header>
                <main className="form">
                    <h2>Are you sure you want to delete team  #{idTeam} - {nameTeam}?</h2>
                </main>
                <footer className="buttonsModal-component">
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={confirm}>Delete</button>
                </footer>
            </div>
        </div>
    )
}

export default ModalAddTeam;