import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Gravatar from 'react-gravatar'
import Moment from 'moment'
import './styles.css';

const ItemCard = ({item}) => (
  <Card className="masonryItem">
    <CardHeader className="cardAvatar"
      title={item.itemowner.fullname}
      subtitle={Moment(item.created).fromNow()}
      avatar={<Gravatar email={item.itemowner.email} />}
    />
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src={item.imageurl} alt="" />
    </CardMedia>
    <CardTitle title={item.title} subtitle={item.tags.map((tag, i) =>
        i > 0 ? ', ' + tag : tag )} />
    <CardText>
        {item.description}
    </CardText>
    <CardActions>
      <FlatButton label="BORROW" />
    </CardActions>
  </Card>
);

export default ItemCard;
