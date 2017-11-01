import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
//import {Provider} from 'react-redux';

import store from './redux/store';
import './index.css';
import muiTheme from './config/theme';

import {
    Route,
    Switch
} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Layout from './components/Layout';
import Login from './containers/Login';
import Share from './containers/Share';
import Items from './containers/Items';
import NotFound from './components/NotFound';

import registerServiceWorker from './registerServiceWorker';
import { updateAuthState } from './redux/modules/auth';
import { userLoading } from './redux/modules/user';
import { FirebaseAuth } from './config/firebase';
import client from './config/apolloClient';

export const history = createHistory();

store.dispatch(userLoading(true));
let gotProfile = false;
store.subscribe(() => {
  const profile = store.getState().auth.userProfile;
  if (profile !== 'LOADING_PROFILE' && !gotProfile) {
    gotProfile = true;
    store.dispatch(userLoading(false));
  }
});

FirebaseAuth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(updateAuthState(user));
  } else {
    store.dispatch(updateAuthState(false));
  }
});

injectTapEventPlugin();

class Boomtown extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <ApolloProvider client={client} store={store}>
                    <ConnectedRouter history={history}>
                        <Layout>
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <PrivateRoute exact path="/" component={Items} />
                                <PrivateRoute exact path="/share" component={Share} />
                                <PrivateRoute path="/profile/:id" component={Items} />
                                <PrivateRoute component={NotFound} />
                            </Switch>
                        </Layout>
                    </ConnectedRouter>
                </ApolloProvider>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
