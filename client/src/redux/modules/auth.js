// ACTION NAMES
export const UPDATE_AUTH_STATE = 'UPDATE_AUTH_STATE';
export const SHOW_LOGIN_ERROR = 'SHOW_LOGIN_ERROR';
export const SHOW_JOIN_MODAL = 'SHOW_JOIN_MODAL';

// ACTION CREATORS
export const updateAuthState = userProfile => ({ type: UPDATE_AUTH_STATE, payload: userProfile });
export const showLoginError = show => ({ type: SHOW_LOGIN_ERROR, payload: show });
export const showJoinModal = show => ({ type: SHOW_JOIN_MODAL, payload: show });

// REDUCER
export default (state = {
    userProfile: 'LOADING_PROFILE',
    showLoginError: false,
    showJoinModal: false
}, action) => {
    switch (action.type) {
    case UPDATE_AUTH_STATE:
        return { ...state, userProfile: action.payload };
    case SHOW_LOGIN_ERROR:
        return { ...state, showLoginError: true };
    case SHOW_JOIN_MODAL:
        return { ...state, showJoinModal: action.payload };
    case '@@redux-form/BLUR':
        return { ...state, showLoginError: false };
    default:
        return state;
    }
};
