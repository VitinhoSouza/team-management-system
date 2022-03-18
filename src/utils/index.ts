export type ITeamProps = {
  id: number
  idPlayers: Array<number>
  name: string
  idCaptain: number
  uid?:string
}

export type IPlayerProps = {
  img?:File|string
  name: string
  age: number
  position: string
  level: 1 | 2 | 3 | 4 | 5
  id:number
  uid?:string
  isCaptain?:boolean
  WithinATeam?:boolean
}

export type IModalAddTeam = {
  toggleModal:() => void;
  confirm:(team:ITeamProps) => void;
}

export type IModalEditTeam = {
  toggleModal:() => void;
  confirm:(team:ITeamProps) => void;
  team:ITeamProps;
}

export type IModalDeleteTeam = {
  toggleModal:() => void;
  confirm:() => void;
  idTeam: number;
  nameTeam: string;
}

export type IModalAddPlayers = {
  toggleModal:() => void;
  confirm:(player:IPlayerProps) => void;
  actionButton:string;
  title:string;
}

export type IModalEditPlayers = {
  toggleModal:() => void;
  confirm:(player:IPlayerProps) => void;
  actionButton:string;
  title:string;
  player:IPlayerProps;
}

export type IModalDeletePlayers = {
  toggleModal:() => void;
  confirm:() => void;
  idPlayer: number;
  namePlayer: string;
}

function sortArray (a:any, b:any){
    if (a.id > b.id) {
      return 1;
    } else if (a.id < b.id) {  
      return -1;
    }
    return 0;
};


export {
    sortArray,
}