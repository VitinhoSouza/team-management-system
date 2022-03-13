export const changeUser = (id:string,name:string,avatar:string) => {
    const newUser = {
        id,name,avatar
    }
    return {
        type: 'changeUser',
        payload: newUser
    }
}