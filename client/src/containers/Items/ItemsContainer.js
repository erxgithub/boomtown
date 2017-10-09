import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Items from './Items';
import Progress from '../../components/Progress';

class ItemsContainer extends Component {
    constructor() {
        super();

        this.state = {
            itemsData: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
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
            const uniqueTags = [];

            let itemsData = items.map((item) => {
                if (item.itemowner !== null) {
                    const itemowner = users.find((user) => user.id === item.itemowner)
                    item.itemowner = itemowner;
                }

                if (item.borrower !== null) {
                    const itemborrower = users.find((user) => user.id === item.borrower)
                    item.borrower = itemborrower.fullname;
                }

                item.tags.map((tag) => {
                    if (uniqueTags.indexOf(tag) === -1) {
                        uniqueTags.push(tag)
                    }
                });

                return item;
            });

            uniqueTags.sort();

            console.log(uniqueTags);
            //console.log('data', itemsData);

            this.setState({
                itemsData,
                isLoading: false
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let itemsData = this.state.itemsData;

        if (this.state.isLoading) {
            return (
                <Progress />
            );
        } else if (itemsData !== undefined && itemsData.length > 0) {
            console.log(itemsData);

            return (
                <Items itemsData={itemsData} />
            );
        } else {
            return(
                <div>
                </div>
            );
        }
    }
}

ItemsContainer.propTypes = {

};

export default ItemsContainer;
