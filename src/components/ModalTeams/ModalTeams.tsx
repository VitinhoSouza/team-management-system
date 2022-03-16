
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

type IModalEdit = {
    toggleModal:() => void;
    confirm:(team:ITeamProps) => void;
    team:ITeamProps;
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
    const [expanded,setExpanded] = useState(false);

    let sizePlayers = 0;
    let fixedValue = 14;
    if(expanded){
        sizePlayers = (players.length * 1.2);
        fixedValue += 2.5;
    }

    const styleMain ={
        height:`${sizePlayers+1}rem`
    }
    const styleModal ={
        height:`${(sizePlayers/2)+fixedValue}rem`
    }

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

    function transformInNumbers(idPlayers:Array<string>){
        return idPlayers.map((id:string) => parseInt(id));
    }
    

    function validateTeam(){
        if(onlyCharSpace(newName) || newPlayers.length === 0)
            dispatch(changePopUp(true,"Error","Unable to create team","Fill in the fields correctly"))
        else{
            confirm({
                id:3,
                idCaptain:newIdCaptain,
                idPlayers: transformInNumbers(newPlayers),
                name:newName
            })
            toggleModal();
        }
    }

    function returnCheckedsPlayers(){
        let completedString:string = "";
        players.map((player:any)=>{
            if(isSelectedPlayer(player.id.toString()))
                if(completedString.length > 0)
                    completedString += ", "+player.name;
                else
                    completedString += player.name;
        })
        return completedString.substr(0, 20);
    }

    function showCheckboxes() {
        var checkboxes = document.getElementById("checkboxes");
        if(checkboxes === null) return;
        if (!expanded) {
            checkboxes.style.display = "block";
            setExpanded(true);
        } else {
            checkboxes.style.display = "none";
            setExpanded(false);
        }
    }

    return(
        <div className="overlayTeam">
            <div className="modalTeam" id="modalCreateTeam" style={styleModal}>
                <header className="header">
                    <div className="getout">
                        <img src={iconClose} alt="" onClick={toggleModal}/>
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
                        
                        <form className="inputForm" id="inputForPlayers" style={styleMain}>
                            <div className="multiselect">
                                <div className="selectBox" onClick={showCheckboxes}>
                                    <select>
                                        <option>
                                            {returnCheckedsPlayers().length > 0 ? 
                                                returnCheckedsPlayers() :"Select an option"}
                                        </option>
                                    </select>
                                    <div className="overSelect"></div>
                                </div>
                                <div id="checkboxes">
                            {players.map((player:any)=>{
                                    return (
                                        <label htmlFor={player.id} 
                                                onChange={() => changeInfoNewTeam("players",player.id.toString())}     
                                        >
                                                    <input type="checkbox" id={player.id} className="checkboxPlayers"/>
                                                    #{player.id} - {player.name}
                                        </label>
                                    )}
                                )
                            }
                                </div>
                            </div>
                        </form>
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

export const ModalEditTeam = ({toggleModal,confirm,team}:IModalEdit) => {

    const dispatch = useDispatch();

    

    const [newName,setNewName] = useState<string>(team.name);
    const [newIdCaptain,setNewIdCaptain] = useState<number>(team.idCaptain);
    const [newPlayers,setNewPlayers] = useState<Array<string>>([]); //transformInString(team.idPlayers)
    const [expanded,setExpanded] = useState(false);

    let sizePlayers = 0;
    let fixedValue = 14;
    if(expanded){
        sizePlayers = (players.length * 1.2);
        fixedValue += 2.5;
    }

    const styleMain ={
        height:`${sizePlayers+1}rem`
    }
    const styleModal ={
        height:`${(sizePlayers/2)+fixedValue}rem`
    }

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

    function transformInString(idPlayers:Array<number>){
        return idPlayers.map((id:number) => id.toString());
    }

    function transformInNumber(idPlayers:Array<string>){
        return idPlayers.map((id:string) => parseInt(id));
    }

    function validateTeam(){
        if(onlyCharSpace(newName) || newPlayers.length === 0)
            dispatch(changePopUp(true,"Error","Unable to create team","Fill in the fields correctly"))
        else{
            confirm({
                id:team.id,
                idCaptain:newIdCaptain,
                idPlayers: transformInNumber(newPlayers),
                name:newName
            })
            toggleModal();
        }
    }

    function returnCheckedsPlayers(){
        let completedString:string = "";
        players.map((player:any)=>{
            if(isSelectedPlayer(player.id.toString()))
                if(completedString.length > 0)
                    completedString += ", "+player.name;
                else
                    completedString += player.name;
        })
        return completedString.substr(0, 20);
    }

    function showCheckboxes() {
        var checkboxes = document.getElementById("checkboxes");
        if(checkboxes === null) return;
        if (!expanded) {
            checkboxes.style.display = "block";
            setExpanded(true);
        } else {
            checkboxes.style.display = "none";
            setExpanded(false);
        }
    }

    return(
        <div className="overlayTeam">
            <div className="modalTeam" id="modalCreateTeam" style={styleModal}>
                <header className="header">
                    <div className="getout">
                        <img src={iconClose} alt="" onClick={toggleModal}/>
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
                        
                        <form className="inputForm" id="inputForPlayers" style={styleMain}>
                            <div className="multiselect">
                                <div className="selectBox" onClick={showCheckboxes}>
                                    <select>
                                        <option>
                                            {returnCheckedsPlayers().length > 0 ? 
                                                returnCheckedsPlayers() :"Select an option"}
                                        </option>
                                    </select>
                                    <div className="overSelect"></div>
                                </div>
                                <div id="checkboxes">
                            {players.map((player:any)=>{
                                    return (
                                        <label htmlFor={player.id}   
                                        >
                                                    <input type="checkbox" id={player.id} className="checkboxPlayers"
                                                        // checked={isSelectedPlayer(player.id.toString(),false)}
                                                        onClick={() => changeInfoNewTeam("players",player.id.toString())} 
                                                        aria-checked={isSelectedPlayer(player.id.toString())}
                                                    />
                                                    #{player.id} - {player.name}
                                        </label>
                                    )}
                                )
                            }
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
                <footer className="buttonsModal-component">
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={validateTeam}>Edit</button>
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