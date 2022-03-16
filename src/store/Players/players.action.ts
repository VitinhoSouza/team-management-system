export const changePlayers = (players:Array<any>) => {

    return {
        type: 'changePlayers',
        payload: players
    }
}