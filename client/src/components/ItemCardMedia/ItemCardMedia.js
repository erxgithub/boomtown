import React from 'react';
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

export default ItemCardMedia;
