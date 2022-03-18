
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import iconClose from "../../assets/close.svg";
import { database } from "../../services/firebase";
import { changePopUp } from "../../store/PopUp/popUp.action";
import { RootState } from "../../store/storeConfig";

import './ModalTeams.scss';

type ITeamProps = {
    id: number
    idPlayers: Array<number>
    name: string
    idCaptain: number
}

type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
    id:number
    uid?:any
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
    const userState:any = useSelector<RootState>(state => state.auth.user);

    const [newName,setNewName] = useState<string>("");
    const [newIdCaptain,setNewIdCaptain] = useState<number>(1);
    const [newPlayers,setNewPlayers] = useState<Array<string>>([]);
    const [expanded,setExpanded] = useState(false);

    const [players,setPlayers] = useState<IPlayerProps[]>([]);

    const sortArray = (a:any, b:any) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {  
          return -1;
        }
        return 0;
    };

    useEffect(()=>{
        if(userState.id !== undefined && userState.id !== ''){
            let playersForUser:Array<IPlayerProps> = [];
            const userRef = database.ref(`users/${userState.id}/players`);
            userRef.once('value',user =>{
                let playersWithId = undefined;
                if(user.val() !== null)
                    playersWithId = Object.entries(user.val());
            
                playersWithId !== null && playersWithId !== undefined &&
                    playersWithId.forEach((playerWithId:any) => {
                        playersForUser.push({
                            uid:playerWithId[0],age:playerWithId[1].age,imgUrl:playerWithId[1].imgUrl,
                            level:playerWithId[1].level,name:playerWithId[1].name,position:playerWithId[1].position,
                            id:playerWithId[1].id,
                        });
                    })
                
                playersForUser.sort(sortArray);
                setPlayers(playersForUser);
            })
            return ()=>{
                userRef.off('value');
            }
        }

    },[userState])

    let sizePlayers = 0;
    let fixedValue = 14;
    let marginTopFooter = 0
    if(expanded){
        sizePlayers = (players.length * 1.2);
        fixedValue += 2.5;
        marginTopFooter = (sizePlayers/2)*1.9;
    }

    const styleMain ={
        height:`${sizePlayers+1}rem`
    }
    const styleModal ={
        height:`${(sizePlayers/2)+fixedValue}rem`
    }
    const styleFooter ={
        marginTop:`${marginTopFooter}rem`,
        marginBottom:`1rem`
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
        else if(!transformInNumbers(newPlayers).includes(newIdCaptain))
            dispatch(changePopUp(true,"Error","Unable to create team","The captain needs is among the players"));
        else{
            confirm({
                id:3,
                idCaptain:newIdCaptain,
                idPlayers: transformInNumbers(newPlayers),
                name:newName.toLocaleUpperCase()
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

    function returnSubstring(value:string){
        return value.substr(0,13);
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
            <div className="modalTeam" id="modalCreateEditTeam" style={styleModal}>
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
                            value={newName} maxLength={15}
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
                                                    {returnSubstring(`#${player.id} - ${player.name}`)}
                                        </label>
                                    )}
                                )
                            }
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
                <footer className="buttonsModal-component" style={styleFooter}>
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={validateTeam}>Create</button>
                </footer>
            </div>
        </div>
    )
}

export const ModalEditTeam = ({toggleModal,confirm,team}:IModalEdit) => {

    const dispatch = useDispatch();
    const userState:any = useSelector<RootState>(state => state.auth.user);

    const [newName,setNewName] = useState<string>(team.name);
    const [newIdCaptain,setNewIdCaptain] = useState<number>(team.idCaptain);
    const [newPlayers,setNewPlayers] = useState<Array<string>>([]); //transformInString(team.idPlayers)
    const [expanded,setExpanded] = useState(false);

    const [players,setPlayers] = useState<IPlayerProps[]>([]);

    const sortArray = (a:any, b:any) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {  
          return -1;
        }
        return 0;
    };

    useEffect(()=>{
        if(userState.id !== undefined && userState.id !== ''){
            let playersForUser:Array<IPlayerProps> = [];
            const userRef = database.ref(`users/${userState.id}/players`);
            userRef.once('value',user =>{
                let playersWithId = undefined;
                if(user.val() !== null)
                    playersWithId = Object.entries(user.val());
            
                playersWithId !== null && playersWithId !== undefined &&
                    playersWithId.forEach((playerWithId:any) => {
                        playersForUser.push({
                            uid:playerWithId[0],age:playerWithId[1].age,imgUrl:playerWithId[1].imgUrl,
                            level:playerWithId[1].level,name:playerWithId[1].name,position:playerWithId[1].position,
                            id:playerWithId[1].id,
                        });
                    })
                
                playersForUser.sort(sortArray);
                setPlayers(playersForUser);
            })
            return ()=>{
                userRef.off('value');
            }
        }

    },[userState])

    let sizePlayers = 0;
    let fixedValue = 15;
    let marginTopFooter = 0;
    if(expanded){
        sizePlayers = (players.length * 1.2);
        fixedValue += 2.5;
        marginTopFooter = (sizePlayers/2)*1.9;
    }

    const styleMain ={
        height:`${sizePlayers+1}rem`
    }
    const styleModal ={
        height:`${(sizePlayers/2)+fixedValue}rem`
    }
    const styleFooter ={
        marginTop:`${marginTopFooter}rem`,
        marginBottom:`1rem`
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

    function transformInNumber(idPlayers:Array<string>){
        return idPlayers.map((id:string) => parseInt(id));
    }

    

    function validateTeam(){
        if(onlyCharSpace(newName) || newPlayers.length === 0)
            dispatch(changePopUp(true,"Error","Unable to edit team","Fill in the fields correctly"))
        else if(!transformInNumber(newPlayers).includes(newIdCaptain))
            dispatch(changePopUp(true,"Error","Unable to edit team","The captain needs is among the players"));
        else{
            confirm({
                id:team.id,
                idCaptain:newIdCaptain,
                idPlayers: transformInNumber(newPlayers),
                name:newName.toLocaleUpperCase()
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

    function returnSubstring(value:string){
        return value.substr(0,13);
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
            <div className="modalTeam" id="modalCreateEditTeam" style={styleModal}>
                <header className="header">
                    <div className="getout">
                        <img src={iconClose} alt="" onClick={toggleModal}/>
                    </div>
                    <span className="title">Editing a team</span>
                </header>
                <main className="form">
                    <div className="info">
                        <span className="title">Enter team name: </span>
                        <input type="text" name="" id="" className="inputForm" 
                            value={newName} maxLength={15}
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
                                                        // checked={isSelectedPlayer(player.id.toString())}
                                                        onClick={() => changeInfoNewTeam("players",player.id.toString())} 
                                                        aria-checked={isSelectedPlayer(player.id.toString())}
                                                    />
                                                    {returnSubstring(`#${player.id} - ${player.name}`)}
                                        </label>
                                    )}
                                )
                            }
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
                <footer className="buttonsModal-component" style={styleFooter}>
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