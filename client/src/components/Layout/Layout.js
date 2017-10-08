import React from 'react';
import PropTypes from 'prop-types';

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import './styles.css';

import logo from '../../images/boomtown-logo.svg';

const styles = {
    toolbar: {
        paddingTop: '2rem',
        paddingLeft: '3rem',
        paddingBottom: '2rem',
        paddingRight: '1rem',
        backgroundColor: 'white',
    },
    dropdown: {
        paddingTop: '0',
        paddingLeft: '2rem',
        paddingBottom: '0',
        paddingRight: '0',
    },
    profile: {
        margin: '0',
    },
    logout: {
        marginTop: '0',
        marginLeft: '1rem',
        marginBottom: '0',
        marginRight: '1rem',
    },
};

const Layout = ({ children }) => (
    <div className="appContentWrapper">
        <div className="appHeader">
            {/* Might want to put your header bar here... */}
            <Toolbar style={styles.toolbar}>
                <ToolbarGroup firstChild={true}>
                    <img className="logo" src={logo} alt="My logo" />
                    <SelectField
                      multiple={true}
                      hintText="Filter by Tag"
                      style={styles.dropdown}
                    >
                        <MenuItem value={1} insetChildren={true} checked={true} primaryText="Never" />
                        <MenuItem value={2} insetChildren={true} primaryText="Every Night" />
                        <MenuItem value={3} insetChildren={true} primaryText="Weeknights" />
                        <MenuItem value={4} insetChildren={true} primaryText="Weekends" />
                        <MenuItem value={5} insetChildren={true} primaryText="Weekly" />
                    </SelectField>
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                    <RaisedButton label="MY PROFILE" primary={true} style={styles.profile} />
                    <RaisedButton label="LOGOUT" secondary={true} style={styles.logout} />
                </ToolbarGroup>
            </Toolbar>
        </div>
        <div className="appContent">
            {children}
        </div>
        {/* And a footer here, but not on the login route... */}
    </div>
);

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
