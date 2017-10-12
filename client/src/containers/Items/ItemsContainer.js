import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Progress from '../../components/Progress';

import Items from './Items';

class ItemsContainer extends Component {
    constructor() {
        super();

        this.state = {
            itemsData: [],
            tagData: [],
            tagValues: [],
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
            const tagData = [];

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
                    if (tagData.indexOf(tag) === -1) {
                        tagData.push(tag)
                    }

                    return tag;
                });

                return item;
            }).filter((item) => {
                let tagValues = this.state.tagValues;
                let tagFilter = true;

                if (tagValues.length > 0) {
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

            console.log(tagData);
            //console.log('data', itemsData);

            this.setState({
                itemsData,
                tagData,
                isLoading: false
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (event, index, tagValues) => {
        this.setState({tagValues})
        this.getItems();
    };

    render() {
        let itemsData = this.state.itemsData;
        let tagData = this.state.tagData;
        let tagValues = this.state.tagValues;

        if (this.state.isLoading) {
            return (
                <Progress />
            );
        } else if (itemsData !== undefined && itemsData.length > 0) {
            console.log(itemsData);
            console.log(tagValues);

            return (
                <Items itemsData={itemsData} tagData={tagData} tagValues={tagValues} handleChange={this.handleChange.bind(this)} />
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
