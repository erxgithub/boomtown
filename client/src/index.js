import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import muiTheme from './config/theme';

import {
    BrowserRouter,
    Route,
    Switch,
    Link,
    Redirect,
    NavLink
} from 'react-router-dom';

import Layout from './components/Layout';
import Login from './containers/Login';
import Items from './containers/Items';
import Profile from './containers/Profile';

const Boomtown = () => (
    <BrowserRouter>
        <Switch>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Layout>
                    <Route path="/profile/:id" component={Profile} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/items" component={Items} />
                </Layout>
            </MuiThemeProvider>
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
