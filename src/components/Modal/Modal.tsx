import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import iconClose from "../../assets/close.svg";
import { changePopUp } from "../../store/PopUp/popUp.action";
import { RootState } from "../../store/storeConfig";
import './Modal.scss';

type IPlayerProps = {
    imgUrl:string
    name: string
    age: number
    position: string
    level: 1 | 2 | 3 | 4 | 5
}
type IModal = {
    toggleModal:() => void;
    confirm:(player:IPlayerProps) => void;
    actionButton:string;
    title:string;
}

const ModalAddPlayer = ({toggleModal,confirm,actionButton,title}:IModal) => {

    const dispatch = useDispatch();
    // const popUpState:any = useSelector<RootState>(state => state.popUp);

    const [newName,setNewName] = useState<string>("");
    const [newImgUrl,setNewImgUrl] = useState<string>("");
    const [newPosition,setNewPosition] = useState<string>("");
    const [newAge,setNewAge] = useState<number>(15);
    const [newLevel,setNewLevel] = useState<1|2|3|4|5>(1);

    function isSelected(value:any){
        if(value === newLevel)
            return true;
        return false;
    }

    function changeInfoNewPlayer(prop:string,value:string|number){
    
        if(prop === 'imgUrl' && typeof value === 'string')
            setNewImgUrl(value);
        else if(prop === 'name' && typeof value === 'string')
            setNewName(value);
        else if(prop === 'position' && typeof value === 'string')
            setNewPosition(value);
        else if(prop === 'age' && typeof value === 'number')
            setNewAge(value);
        else if(prop === 'level' && value === 1 || value === 2 || value === 3 ||value === 4 || value === 5)
            setNewLevel(value);
    }

    function onlyCharSpace(value:string){
        for (var i = 0; i < value.length; i++) {
            if(value[i] != " ")
                return false;
        }
        return true;
    }
    
    function validatePlayer(){
        if(onlyCharSpace(newName) || onlyCharSpace(newImgUrl) || onlyCharSpace(newPosition))
            dispatch(changePopUp(true,"Error","Unable to create player","Fill in the fields correctly"))
        else{
            confirm({
                imgUrl:newImgUrl,
                age:newAge,
                level:newLevel,
                name:newName,
                position:newPosition
            })
            toggleModal();
        }
    }

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
                            value={newName} 
                            onChange={(e:any)=>changeInfoNewPlayer("name",e.target.value)}/>
                    </div>
                    <div className="info">
                        <span className="title">Enter player photo URL:</span>
                        <input type="text" name="" id="" className="inputForm" 
                            value={newImgUrl} 
                            onChange={(e:any)=>changeInfoNewPlayer("imgUrl",e.target.value)}/>
                    </div>
                    <div className="info">
                        <span className="title">Enter player position: </span>
                        <input type="text" name="" id="" className="inputForm" 
                            value={newPosition} 
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
                            <option value="1" selected={isSelected("1")}>1 star</option>
                            <option value="2" selected={isSelected("2")}>2 stars</option>
                            <option value="3" selected={isSelected("3")}>3 stars</option>
                            <option value="4" selected={isSelected("4")}>4 stars</option>
                            <option value="5" selected={isSelected("5")}>5 stars</option>
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

export default ModalAddPlayer;