// ACTIONS
const GET_USER_LOADING = 'GET_USER_LOADING';

// ACTION CREATORS
export const userLoading = (loading) => ({ type: GET_USER_LOADING, payload: loading });

// REDUCER
export default (state = {
    isLoading: undefined,
}, action) => {
    switch (action.type) {
    case GET_USER_LOADING:
        return { ...state, isLoading: action.payload };
    default:
        return state;
    }
};
