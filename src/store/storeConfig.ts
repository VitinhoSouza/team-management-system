import { createStore, combineReducers} from 'redux'
import authReducer from './Auth/auth.reducer'
import popUpReducer from './PopUp/popUp.reducer'

const reducers = combineReducers({
    auth: authReducer,
    popUp: popUpReducer
});

function storeConfig(){
    return createStore(reducers)
}

export type RootState = ReturnType<typeof reducers>;
export default storeConfig;