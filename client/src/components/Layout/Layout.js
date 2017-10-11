import React from 'react';
import PropTypes from 'prop-types';

import HeaderBar from '../HeaderBar';
import FooterBar from '../FooterBar';

import './styles.css';

const Layout = ({ children }) => (
    <div className="appContentWrapper">
        <div className="appHeader">
            {/* Might want to put your header bar here... */}
            <HeaderBar />
        </div>
        {children}
        {/* And a footer here, but not on the login route... */}
        <FooterBar />
    </div>
);

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
