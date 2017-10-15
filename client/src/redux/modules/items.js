import PropTypes from 'prop-types';

// action types

const GET_ITEMS = 'GET_ITEMS';
const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
const GET_TAGS = 'GET_TAGS';
const GET_TAG_VALUES = 'GET_TAG_VALUES';
const GET_PROFILE = 'GET_PROFILE';

// action creators

export const getItems = (items) => ({
    type: GET_ITEMS,
    payload: items
});

export const getItemsLoading = () => ({
    type: GET_ITEMS_LOADING
});

export const getItemsError = (error) => ({
    type: GET_ITEMS_ERROR,
    payload: error
});

export const getTags = (items) => ({
    type: GET_TAGS,
    payload: items
});

export const getTagValues = (items) => ({
    type: GET_TAG_VALUES,
    payload: items
});

export const getProfile = (items) => ({
    type: GET_PROFILE,
    payload: items
});

// helper functions

export const fetchItemsAndUsers = (tagValues, profileId) => dispatch => {
    dispatch(getItemsLoading());

    let urls = [
        'http://localhost:3001/items',
        'http://localhost:3001/users'
    ];

    Promise.all(urls.map((request) => {
        return fetch(request).then((response) => {
            return response.json();
        }).then((data) => {
            return data;
        });
    })).then((values) => {
        const [items, users] = values;
        const tagData = [];
        const profileData = {
            id: '',
            fullname: '',
            email: '',
            bio: '',
            shared: 0,
            borrowed: 0
        };

        let itemsData = items.map((item) => {
            if (item.itemowner !== null) {
                const itemowner = users.find((user) => user.id === item.itemowner)
                item.itemowner = itemowner;

                if (itemowner.id === profileId) {
                    if (profileData.id.length === 0) {
                        profileData.id = itemowner.id;
                        profileData.fullname = itemowner.fullname;
                        profileData.email = itemowner.email;
                        profileData.bio = itemowner.bio;
                    }

                    profileData.shared++;
                }
            }

            if (item.borrower !== null) {
                if (item.borrower === profileId) {
                    profileData.borrowed++;
                }

                const itemborrower = users.find((user) => user.id === item.borrower)
                item.borrower = itemborrower.fullname;
            }

            if (profileId === undefined) {
                item.tags.map((tag) => {
                    if (tagData.indexOf(tag) === -1) {
                        tagData.push(tag)
                    }

                    return tag;
                });
            }

            return item;
        }).filter((item) => {
            let tagFilter = true;

            if (profileId !== undefined) {
                if (item.itemowner.id !== profileId) {
                    tagFilter = false;
                }
            } else if (tagValues !== undefined && tagValues.length > 0) {
                tagFilter = false;

                for (let i = 0; i < tagValues.length; i++) {
                    if (item.tags.find((tag) => tag === tagValues[i])) {
                        tagFilter = true;
                        break;
                    }
                }
            }

            return tagFilter;
        });

        tagData.sort();

        dispatch(getItems(itemsData));
        dispatch(getTags(tagData));
        dispatch(getProfile(profileData));
    }).catch((error) => {
        dispatch(getItemsError(error));
        console.log(error);
    });
}

fetchItemsAndUsers.propTypes = {
    tagValues: PropTypes.array,
    profileId: PropTypes.string
};

export const loadTagValues = (tagValues) => dispatch => {
    dispatch(getItemsLoading());
    dispatch(getTagValues(tagValues));
}

loadTagValues.propTypes = {
    tagValues: PropTypes.array
};

//reducers

export default (state = {itemsData: [], tagData: [], tagValues: [], profileData: {}, isLoading: false, error: ''}, action) => {
  switch (action.type) {
    case GET_ITEMS: {
      return {...state, itemsData: action.payload, isLoading: false, error: ''};
    }
    case GET_ITEMS_LOADING: {
      return {...state, isLoading: true, error: ''};
    }
    case GET_ITEMS_ERROR: {
      return {...state, isLoading: false, error: action.payload};
    }
    case GET_TAGS: {
      return {...state, tagData: action.payload, error: ''};
    }
    case GET_TAG_VALUES: {
      return {...state, tagValues: action.payload, isLoading: false, error: ''};
    }
    case GET_PROFILE: {
      return {...state, profileData: action.payload, isLoading: false, error: ''};
    }
    default:
        return state;
    }
};
