const initialState = {
    status: false,
    type: "Successs",
    message: "GenericGenericGeneric",
    submessage: "GenericGenericGenericGenericGenericGenericGeneric"
}

export default function(state = initialState, action:any){

    switch(action.type){
        case 'changePopUp':
            return {
                ...state,
                status: action.payload.status,
                type: action.payload.type,
                message: action.payload.message,
                submessage: action.payload.submessage,
            }

        default:
            return state;
    }
}