import React from 'react';
import PropTypes from 'prop-types';
import {CardMedia, CardTitle} from 'material-ui/Card';

const ItemCardMedia = ({item}) => {
    if (!item.available) {
        let subtitle = '';

        if (item.borrower !== null) {
            subtitle = `LENT TO ${item.borrower.toUpperCase()}`;
        } else {
            subtitle = "UNAVAILABLE";
        }

        return (
            <CardMedia
                overlay={<CardTitle subtitleColor='lightgrey' subtitle={subtitle} />}
            >
                <img src={item.imageurl} alt="" />
            </CardMedia>

        );
    } else {
        return (
            <CardMedia>
                <img src={item.imageurl} alt="" />
            </CardMedia>
        );
    }
}

ItemCardMedia.propTypes = {
    item: PropTypes.shape({
        available: PropTypes.bool,
        borrower: PropTypes.string,
        created: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.number,
        imageurl: PropTypes.string,
        itemowner: PropTypes.shape({
            bio: PropTypes.string,
            email: PropTypes.string,
            fullname: PropTypes.string,
            id: PropTypes.string
        }),
        tags: PropTypes.array,
        title: PropTypes.string
    })
};

export default ItemCardMedia;
