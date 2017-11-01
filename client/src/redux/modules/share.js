import { change } from 'redux-form';

// ACTIONS
export const NEXT_SHARE_ITEM_FORM_STEP = 'NEXT_SHARE_ITEM_FORM_STEP';
export const PREV_SHARE_ITEM_FORM_STEP = 'PREV_SHARE_ITEM_FORM_STEP';
export const RESET_SHARE_ITEM_FORM = 'RESET_SHARE_ITEM_FORM';
export const SET_ITEM_IMAGE_URL = 'SET_ITEM_IMAGE_URL';
export const START_IMAGE_UPLOAD = 'START_IMAGE_UPLOAD';
export const SELECT_SHARE_ITEM_CATEGORY = 'SELECT_SHARE_ITEM_CATEGORY';

// ACTION CREATORS
export const nextShareItemFormStep = (formState) => ({
    type: NEXT_SHARE_ITEM_FORM_STEP,
    payload: formState
});

export const prevShareItemFormStep = (formState) => ({
    type: PREV_SHARE_ITEM_FORM_STEP,
    payload: formState
});

export const resetShareItemForm = () => ({
    type: RESET_SHARE_ITEM_FORM
});

export const startImageUpload = () => ({
    type: START_IMAGE_UPLOAD
});

export const setItemImageUrl = (url) => ({
    type: SET_ITEM_IMAGE_URL,
    payload: url
});

export const selectShareItemCategory = filters => (dispatch) => {


    dispatch(change('ShareItemForm', 'itemCategoryTags', filters));

    dispatch({
        type: SELECT_SHARE_ITEM_CATEGORY,
        payload: filters
    });
};

// REDUCER
const initialState = {
    form: {
        finished: false,
        stepIndex: 0,
        categoryFilters: []
    },
    upload: {
        uploading: false,
        itemImageUrl: ''
    }
};
export default (state = initialState, action) => {
    switch (action.type) {
    case NEXT_SHARE_ITEM_FORM_STEP:
    case PREV_SHARE_ITEM_FORM_STEP:
        return { ...state, form: { ...state.form, ...action.payload } };
    case START_IMAGE_UPLOAD:
        return { ...state, upload: { ...state.upload, uploading: true } };
    case SET_ITEM_IMAGE_URL:
        return { ...state, upload: { uploading: false, url: action.payload } };
    case SELECT_SHARE_ITEM_CATEGORY:
        return { ...state, form: { ...state.form, categoryFilters: action.payload } };
    case RESET_SHARE_ITEM_FORM:
        return initialState;
    default:
        return state;
    }
};
