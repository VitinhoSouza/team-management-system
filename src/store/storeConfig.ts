import { createStore, combineReducers} from 'redux'
import authReducer from './Auth/auth.reducer'

const reducers = combineReducers({
    auth: authReducer
});

function storeConfig(){
    return createStore(reducers)
}

export type RootState = ReturnType<typeof reducers>;
export default storeConfig;