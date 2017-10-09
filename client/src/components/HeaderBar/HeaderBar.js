import React from 'react';

import './styles.css';

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import logo from '../../images/boomtown-logo.svg';

const tags = [
    "Electronics",
    "Household Items",
    "Musical Instruments",
    "Physical Media",
    "Recreational Equipment",
    "Sporting Goods",
    "Tools",
];

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

const HeaderBar = () => (
    <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
            <img className="logo" src={logo} alt="My logo" />
            <SelectField
              multiple={true}
              hintText="Filter by Tag"
              style={styles.dropdown}
            >
                {tags.map((tag, i) => (
                    <MenuItem
                        key={i}
                        insetChildren={true}
                        checked={true}
                        value={i + 1}
                        primaryText={tag}
                    />
                ))}
            </SelectField>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
            <RaisedButton href="/profile" label="MY PROFILE" primary={true} style={styles.profile} />
            <RaisedButton label="LOGOUT" secondary={true} style={styles.logout} />
        </ToolbarGroup>
    </Toolbar>
);

export default HeaderBar;
