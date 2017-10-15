import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './redux/store';
import './index.css';
import muiTheme from './config/theme';

import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import Layout from './components/Layout';
import Login from './containers/Login';
import Items from './containers/Items';
import NotFound from './components/NotFound';

const Boomtown = () => (
    <BrowserRouter>
        <Switch>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={store}>
                    <Layout>
                        <Route exact path="/" component={Items} />
                        <Route exact path="/login" component={Login} />
                        <Route path="/profile/:id" component={Items} />
                        <Route component={NotFound} />
                    </Layout>
                </Provider>
            </MuiThemeProvider>
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
