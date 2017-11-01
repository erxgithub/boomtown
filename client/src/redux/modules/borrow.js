// ACTIONS
export const SHOW_BORROW_MODAL = 'SHOW_BORROW_MODAL';

// ACTION CREATORS
export const showBorrowModal = (show, itemid) => ({ type: SHOW_BORROW_MODAL, payload: { show, itemid } });

// REDUCER
export default (state = {
    showBorrowModal: false,
    itemid: undefined
}, action) => {
    switch (action.type) {
    case SHOW_BORROW_MODAL:
        return {
            ...state,
            showBorrowModal: action.payload.show,
            itemid: action.payload.itemid
        };
    default:
        return state;
    }
};

