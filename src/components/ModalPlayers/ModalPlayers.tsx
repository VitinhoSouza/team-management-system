import { useState } from "react";
import { useDispatch } from "react-redux";
import iconClose from "../../assets/close.svg";
import { changePopUp } from "../../store/PopUp/popUp.action";
import {IModalAddPlayers, IModalEditPlayers, IModalDeletePlayers} from "../../utils";

import './ModalPlayers.scss';

const ModalAddPlayer = ({toggleModal,confirm,actionButton,title}:IModalAddPlayers) => {

    const dispatch = useDispatch();

    const [newName,setNewName] = useState<string>("");
    const [newPosition,setNewPosition] = useState<string>("");
    const [newAge,setNewAge] = useState<number>(15);
    const [newLevel,setNewLevel] = useState<1|2|3|4|5>(1);

    const [file, setFile] = useState<File | undefined>(undefined);
    const [wrongFormat, setWrongFormat] = useState<Boolean>(false);

    function changeInfoNewPlayer(prop:string,value:string|number){
    
        if(prop === 'name' && typeof value === 'string')
            setNewName(value);
        else if(prop === 'position' && typeof value === 'string')
            setNewPosition(value);
        else if(prop === 'age' && typeof value === 'number')
            setNewAge(value);
        else if(prop === 'level' && (value === 1 || value === 2 || value === 3 ||value === 4 || value === 5))
            setNewLevel(value);
    }
    
    function validatePlayer(){
        if(newName.trim() === "" || newPosition.trim() === "" || wrongFormat)
            dispatch(changePopUp(true,"Error","Unable to create player","Fill in the fields correctly"))
        else{
            confirm({
                age:newAge,
                level:newLevel,
                name:newName,
                position:newPosition,
                id:5,
                img:file
            })
            toggleModal();
        }
    }
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e?.target?.files) {    
            if (e.target.files[0]) 
                setFile(e.target.files[0]);
            else setWrongFormat(true);
        }
    };

    return(
        <div className="overlay">
            <div className="modal">
                <header className="header">
                    <div className="getout" onClick={toggleModal}>
                        <img src={iconClose} alt="" />
                    </div>
                    <span className="title">{title}</span>
                </header>
                <main className="form">
                    <div className="info">
                        <span className="title">Enter player name: </span>
                        <input type="text" name="" id="" className="inputForm" 
                            value={newName} maxLength={11}
                            onChange={(e:any)=>changeInfoNewPlayer("name",e.target.value)}/>
                    </div>
                    <div className="info" id="uploadImage">
                        <span className="title">Upload the photo from your computer:</span>
                        <input
                            id="dropInput"
                            type="file"
                            accept=".jpg,.png,svg,.gif,.apng,.webp"
                            onChange={onChange}
                            placeholder={"adadsa"}
                        />
                    </div>
                    <div className="info">
                        <span className="title">Enter player position: </span>
                        <input type="text" name="" id="" className="inputForm" 
                            value={newPosition} maxLength={10}
                            onChange={(e:any)=>changeInfoNewPlayer("position",e.target.value)}/>
                    </div>
                    <div className="info">
                        <span className="title">Enter player age: </span>
                        <input type="number" name="" id="" className="inputForm" min={15} max={100}
                            value={newAge}
                            onChange={(e:any)=>changeInfoNewPlayer("age",parseInt(e.target.value))}/>
                    </div>
                    <div className="info">
                        <span className="title">Enter player level:</span>
                        <select name="select" className="inputForm" id="selectStars" 
                            value={newLevel}
                            onInput={(e:any)=>changeInfoNewPlayer("level",parseInt(e.target.value))} >
                            <option value="1">1 star</option>
                            <option value="2" >2 stars</option>
                            <option value="3" >3 stars</option>
                            <option value="4" >4 stars</option>
                            <option value="5" >5 stars</option>
                        </select>
                    </div>
                </main>
                <footer className="buttonsModal-component">
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={validatePlayer}>{actionButton !== undefined ? actionButton: "Create"}</button>
                </footer>
            </div>
        </div>
    )
}

export const ModalEditPlayer = ({toggleModal,confirm,actionButton,title,player}:IModalEditPlayers) => {

    const dispatch = useDispatch();

    const [name,setName] = useState<string>(player.name);
    const [position,setPosition] = useState<string>(player.position);
    const [age,setAge] = useState<number>(player.age);
    const [level,setLevel] = useState<1|2|3|4|5>(player.level);
    const id = player.id;

    let blob;
    typeof player.img === "string"  && player.img !== undefined &&
        fetch(player.img).then(r => blob = r.blob());
    const [file, setFile] = useState<File | undefined>(blob);
    const [wrongFormat, setWrongFormat] = useState<Boolean>(false);

    function changeInfoPlayer(prop:string,value:string|number){
    
        if(prop === 'name' && typeof value === 'string')
            setName(value);
        else if(prop === 'position' && typeof value === 'string')
            setPosition(value);
        else if(prop === 'age' && typeof value === 'number')
            setAge(value);
        else if(prop === 'level' && (value === 1 || value === 2 || value === 3 ||value === 4 || value === 5))
            setLevel(value);
    }
    
    function validatePlayer(){
        if(name.trim() === "" || position.trim() === "" || wrongFormat)
            dispatch(changePopUp(true,"Error","Unable to edit player","Fill in the fields correctly"))
        else{
            confirm({
                age:age,
                level:level,
                name:name,
                position:position,
                id:id,
                img:file
            })
            toggleModal();
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e?.target?.files) {    
            if (e.target.files[0]) 
                setFile(e.target.files[0]);
            else setWrongFormat(true);
        }
    };

    return(
        <div className="overlay">
            <div className="modal">
                <header className="header">
                    <div className="getout" onClick={toggleModal}>
                        <img src={iconClose} alt="" />
                    </div>
                    <span className="title">{title}</span>
                </header>
                <main className="form">
                    <div className="info">
                        <span className="title">Enter player name: </span>
                        <input type="text" name="" id="" className="inputForm" 
                            value={name} maxLength={11}
                            onChange={(e:any)=>changeInfoPlayer("name",e.target.value)}/>
                    </div>
                    <div className="info" id="uploadImage">
                        <span className="title">Upload the photo from your computer:</span>
                        <input
                            id="dropInput"
                            type="file"
                            accept=".jpg,.png,svg,.gif,.apng,.webp"
                            onChange={onChange}
                            placeholder={"adadsa"}
                        />
                    </div>
                    <div className="info">
                        <span className="title">Enter player position: </span>
                        <input type="text" name="" id="" className="inputForm" 
                            value={position} maxLength={10}
                            onChange={(e:any)=>changeInfoPlayer("position",e.target.value)}/>
                    </div>
                    <div className="info">
                        <span className="title">Enter player age: </span>
                        <input type="number" name="" id="" className="inputForm" min={15} max={100}
                            value={age} 
                            onChange={(e:any)=>changeInfoPlayer("age",parseInt(e.target.value))}/>
                    </div>
                    <div className="info">
                        <span className="title">Enter player level:</span>
                        <select name="select" className="inputForm" id="selectStars" 
                            value={level} 
                            onInput={(e:any)=>changeInfoPlayer("level",parseInt(e.target.value))} >
                            <option value="1">1 star</option>
                            <option value="2">2 stars</option>
                            <option value="3">3 stars</option>
                            <option value="4">4 stars</option>
                            <option value="5">5 stars</option>
                        </select>
                    </div>
                </main>
                <footer className="buttonsModal-component">
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={validatePlayer}>{actionButton !== undefined ? actionButton: "Create"}</button>
                </footer>
            </div>
        </div>
    )
}

export const ModalDeletePlayer = ({toggleModal,confirm,idPlayer,namePlayer}:IModalDeletePlayers) => {


    return(
        <div className="overlay">
            <div className="modal" id="modalDeletePlayers">
                <header className="header">
                    <div className="getout" onClick={toggleModal}>
                        <img src={iconClose} alt="" />
                    </div>
                    <span className="title">Deleting a player</span>
                </header>
                <main className="form">
                    <h2>Are you sure you want to delete player  #{idPlayer} - {namePlayer}?</h2>
                </main>
                <footer className="buttonsModal-component">
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={confirm}>Delete</button>
                </footer>
            </div>
        </div>
    )
}

export default ModalAddPlayer;