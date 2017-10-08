import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Gravatar from 'react-gravatar'
import Moment from 'moment'

import ItemCardMedia from '../ItemCardMedia';

import './styles.css';

const ItemCard = ({item}) => (
    <Card className="masonryItem">
        <ItemCardMedia item={item} />
        <CardHeader className="cardAvatar"
            title={item.itemowner.fullname}
            subtitle={Moment(item.created).fromNow()}
            avatar={<Gravatar email={item.itemowner.email} />}
        />
        <CardTitle title={item.title} subtitle={item.tags.map((tag, i) =>
            i > 0 ? ', ' + tag : tag )} />
        <CardText>
            {item.description}
        </CardText>
        <CardActions>
            {item.available ? <RaisedButton label="BORROW" secondary={true} /> : ''}
        </CardActions>
    </Card>
);

export default ItemCard;
