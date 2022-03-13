const initialState = {
    status: "Visible",
    type: "Successs",
    message: "Generic",
    submessage: "Generic"
}

export default function(state = initialState, action:any){

    switch(action.type){
        case 'changePopUp':
            return {
                ...state,
                status: action.payload.status,
                type: action.payload.status,
                message: action.payload.status,
                submessage: action.payload.status,
            }

        default:
            return state;
    }
}