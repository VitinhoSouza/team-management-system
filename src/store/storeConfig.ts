import { createStore, combineReducers} from 'redux'

import authReducer from './Auth/auth.reducer'
import popUpReducer from './PopUp/popUp.reducer'
import playersReducer from './Players/players.reducer'

const reducers = combineReducers({
    auth: authReducer,
    popUp: popUpReducer,
    players: playersReducer
});

function storeConfig(){
    return createStore(reducers)
}

export type RootState = ReturnType<typeof reducers>;
export default storeConfig;