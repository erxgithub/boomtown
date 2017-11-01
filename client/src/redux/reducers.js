import { combineReducers } from 'redux';
import client from '../config/apolloClient';
import itemReducer from './modules/items';
// import userReducer from './modules/user';

export default combineReducers({
    apollo: client.reducer(),
    items: itemReducer
});
