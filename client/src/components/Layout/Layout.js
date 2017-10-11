import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Layout = ({ children }) => (
    <div className="appContentWrapper">
        {children}
    </div>
);

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
