import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";

import { database } from '../../services/firebase';
import { RootState } from '../../store/storeConfig';
import { changePopUp } from '../../store/PopUp/popUp.action';
import { changeUser } from '../../store/Auth/auth.action';
import { TeamCard } from '../../components/TeamCard/TeamCard';
import ModalAddTeam from '../../components/ModalTeams/ModalTeams';
import { sortArray, ITeamProps } from '../../utils';

import plusIcon from '../../assets/plus.svg'

import './Teams.scss';

export function Teams(){

    const dispatch = useDispatch();
    const userState:any = useSelector<RootState>(state => state.auth.user);

    const [modalCreateIsOn, setModalCreateIsOn] = useState(false);
    const [teams,setTeams] = useState<ITeamProps[]>([]);

    function toggleModalCreate(){
        if(modalCreateIsOn === true){
            setModalCreateIsOn(false);
        }else{
            setModalCreateIsOn(true);
        }
    }

    function createTeam(team:ITeamProps){
        
        dispatch(changePopUp(false,"","",""));

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userState.id}/teams`)).then((result) => {

            let lastElement:any;
            let newIdTeam = 1;
            if(result.val() !== null && Object.keys(result.val()).length > 0){ 
                lastElement = Object.values(result.val())[ Object.values(result.val()).length -1];
                newIdTeam = lastElement.id + 1;
            }
            const userRef = database.ref('users/'+userState.id+'/teams');
            userRef.push({
                id: newIdTeam,
                idPlayers: team.idPlayers,
                name: team.name,
                idCaptain: team.idCaptain
            })
            
            dispatch(changePopUp(true,"Success","The team was created.",""));
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
        }).catch((error) => {
            console.error(error);
            dispatch(changePopUp(true,"Error","Unable to create team!",""));
        });
    }

    function searchTeamByName(teamName:string){
        if(teamName !== ""){
            let teamsFound = teams.filter(team => team.name.includes(teamName.toLocaleUpperCase()))
            setTeams(teamsFound);
        }else{
            dispatch(changeUser(userState.id,userState.name,userState.avatar));
        }
    }

    function mountTeams(){
        return(
            teams.map((team:ITeamProps) => {
                return <TeamCard 
                            id={team.id}
                            idCaptain={team.idCaptain}
                            name={team.name}
                            idPlayers={team.idPlayers}
                            key={`${team.id}_key`}
                            uid={team.uid}
                        />
            })
            
        )
    }

    useEffect(()=>{
        if(userState.id !== undefined && userState.id !== ''){
            let teamsForUser:Array<ITeamProps> = [];
            const userRef = database.ref(`users/${userState.id}/teams`);
            userRef.once('value',user =>{
                let teamsWithId = undefined;
                if(user.val() !== null)
                    teamsWithId = Object.entries(user.val());
                teamsWithId !== null && teamsWithId !== undefined &&
                    teamsWithId.forEach((teamsWithId:any) => {
                        teamsForUser.push({
                            uid:teamsWithId[0],
                            id:teamsWithId[1].id,
                            idCaptain:teamsWithId[1].idCaptain,
                            idPlayers:teamsWithId[1].idPlayers,
                            name:teamsWithId[1].name,
                        });
                    })
                
                teamsForUser.sort(sortArray);
                setTeams(teamsForUser);
            })
            return ()=>{
                userRef.off('value');
            }
        }

    },[userState])

    return(
        <div className="teamsContainer">

            {modalCreateIsOn && (
                <ModalAddTeam toggleModal={toggleModalCreate} 
                                confirm={(createTeam)}
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