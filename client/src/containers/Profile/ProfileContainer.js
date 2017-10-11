import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Progress from '../../components/Progress';

import Profile from './Profile';
import Items from '../Items/Items';

class ProfileContainer extends Component {
    constructor() {
        super();

        this.state = {
            itemsData: [],
            profileData: {
                id: '',
                fullname: '',
                email: '',
                bio: '',
                shared: 0,
                borrowed: 0
            },
            isLoading: false
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.getItems(this.props.match.params.id);
    }

    getItems(profileId) {
        let urls = [
            'http://localhost:3001/items',
            'http://localhost:3001/users'
        ];

        this.setState({
            isLoading: true
        });

        Promise.all(urls.map((request) => {
            return fetch(request).then((response) => {
                return response.json();
            }).then((data) => {
                return data;
            });
        })).then((values) => {
            //console.log('items', values[0]);
            //console.log('users', values[1]);

            // let items = values[0];
            // let users = values[1];

            const [items, users] = values;
            const profileData = {
                id: '',
                fullname: '',
                email: '',
                bio: '',
                shared: 0,
                borrowed: 0
            };
            const uniqueTags = [];

            let itemsData = items.map((item) => {
                if (item.itemowner !== null) {
                    const itemowner = users.find((user) => user.id === item.itemowner)
                    item.itemowner = itemowner;

                    if (profileData.id.length === 0 && itemowner.id === profileId) {
                        profileData.id = itemowner.id;
                        profileData.fullname = itemowner.fullname;
                        profileData.email = itemowner.email;
                        profileData.bio = itemowner.bio;
                    }
                }

                if (item.borrower !== null) {
                    const itemborrower = users.find((user) => user.id === item.borrower)
                    item.borrower = itemborrower.fullname;
                }

                item.tags.map((tag) => {
                    if (uniqueTags.indexOf(tag) === -1) {
                        uniqueTags.push(tag)
                    }

                    return tag;
                });

                return item;
            }).filter((item) => {
                return item.itemowner.id === profileId;
            });

            uniqueTags.sort();

            console.log(uniqueTags);
            //console.log('data', itemsData);

            this.setState({
                itemsData,
                profileData,
                isLoading: false
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let itemsData = this.state.itemsData;
        let profileData = this.state.profileData;

        if (this.state.isLoading) {
            return (
                <Progress />
            );
        } else if (itemsData !== undefined && itemsData.length > 0) {
            console.log(itemsData);

            return (
                <Profile itemsData={itemsData} profileData={profileData} />
            );
        } else {
            return(
                <div>
                </div>
            );
        }
    }
}

ProfileContainer.propTypes = {

};

export default ProfileContainer;
