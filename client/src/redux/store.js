import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import client from '../config/apolloClient';
//import { history } from '../index';

//export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            client.middleware(),
            thunk
        )
    )
);
