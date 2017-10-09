import React from 'react';
import PropTypes from 'prop-types';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
    NavLink
} from 'react-router-dom';

import HeaderBar from '../HeaderBar';
import FooterBar from '../FooterBar';
import Profile from '../Profile';

import './styles.css';

const Layout = ({ children }) => (
    <Router>
        <div className="appContentWrapper">
            <div className="appHeader">
                {/* Might want to put your header bar here... */}
                <HeaderBar />
            </div>
            <div className="profileSection">
                <Switch>
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </div>
            <div className="appContent">
                {children}
            </div>
            {/* And a footer here, but not on the login route... */}
            <FooterBar />
        </div>
    </Router>
);

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
