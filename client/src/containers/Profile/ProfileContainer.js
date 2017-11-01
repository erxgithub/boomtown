import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile';
import Loader from '../../components/Loader'
import { fetchItemsAndUsers} from '../../redux/modules/items';
import { Provider, connect } from 'react-redux';
import '../../flex.css';
import './styles.css'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ProfileContainer extends Component{

    render(){
        return(
            <div className="profile flex justify-center">
                <div>
                {this.props.isLoading ? <Loader /> : <Profile data={this.props.itemsData} profileId={this.props.match.params.userid}/>}
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.props.dispatch(fetchItemsAndUsers());
    }
}

export const userQuery = gql`
    query getUser($id: String!) {
        user(id: $id) {
            id
            email
            fullname
            bio
            items {
                id
                title
                imageurl
                description
                tags {
                    title
                }
                created
                borrower {
                    fullname
                }
            }
            borrowed {
                title
                itemowner {
                    fullname
                }
            }
        }
    }
`;

ProfileContainer.propTypes = {
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
    itemFilters: state.items.itemFilters
});

const ProfileContainerWithData = graphql(userQuery, {
    options: (ownProps) => ({
        variables: {
            id: ownProps.match.params.id
        }
    })
})(ProfileContainer);

export default connect(mapStateToProps)(ProfileContainerWithData);
