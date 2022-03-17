export const changePlayers = (players:Array<any>) => {

    return {
        type: 'changePlayers',
        payload: players
    }
}

export const getPlayers = () => {

    return {
        type: 'getPlayersSaga'
    }
}