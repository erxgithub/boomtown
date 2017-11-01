import React from 'react';
import { connect } from 'react-redux';
import {
    Route,
    Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            authenticated
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
        )}
    />
);

const mapStateToProps = state => ({
    authenticated: state.auth.userProfile,
});

export default connect(mapStateToProps)(PrivateRoute);
