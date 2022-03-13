const initialState = {
    user: {
        id:'',
        name:'',
        avatar:''
    },
}

export default function(state = initialState, action:any){

    switch(action.type){
        case 'changeUser':
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}