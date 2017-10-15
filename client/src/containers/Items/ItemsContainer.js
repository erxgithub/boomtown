import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { fetchItemsAndUsers, loadTagValues } from '../../redux/modules/items';

import Items from './Items';

class ItemsContainer extends Component {
    componentDidMount() {
        let tagValues = this.props.tagValues;
        let profileId = this.props.match.params.id;
        this.props.dispatch(fetchItemsAndUsers(tagValues, profileId));
    }

    handleChange = (event, index, tagValues) => {
        this.props.dispatch(loadTagValues(tagValues));
        this.props.dispatch(fetchItemsAndUsers(tagValues));
    };

    render() {
        let itemsData = this.props.itemsData;
        let tagData = this.props.tagData;
        let tagValues = this.props.tagValues;
        let profileData = this.props.profileData;
        let isLoading = this.props.isLoading;

        return (
            <Items
                itemsData={itemsData}
                tagData={tagData}
                tagValues={tagValues}
                profileData={profileData}
                isLoading={isLoading}
                handleChange={this.handleChange.bind(this)}
            />
        );
    }
}

ItemsContainer.propTypes = {
    itemsData: PropTypes.array,
    tagData: PropTypes.array,
    tagValues: PropTypes.array,
    profileData: PropTypes.shape({
        id: PropTypes.string,
        fullname: PropTypes.string,
        email: PropTypes.string,
        bio: PropTypes.string,
        shared: PropTypes.number,
        borrowed: PropTypes.number,
        borroweditems: PropTypes.array
    }),
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    itemsData: state.items.itemsData,
    tagData: state.items.tagData,
    tagValues: state.items.tagValues,
    profileData: state.items.profileData
});

//export default ItemsContainer

export default connect(mapStateToProps)(ItemsContainer);
