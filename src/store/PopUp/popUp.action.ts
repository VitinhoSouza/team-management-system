export const changePopUp = (status:boolean,type:string,message:string,submessage:string) => {
    const newPopUp = {
        status,type,message,submessage
    }
    return {
        type: 'changePopUp',
        payload: newPopUp
    }
}