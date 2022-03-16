const initialState = {
    players:[]
}

export default function(state = initialState, action:any){

    switch(action.type){
        case 'changePlayers':
            state.players = [];
            return {
                ...state,
                players: action.payload
            }

        default:
            return state;
    }
}