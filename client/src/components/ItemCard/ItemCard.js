import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Gravatar from 'react-gravatar'
import Moment from 'moment'

import ItemCardMedia from '../ItemCardMedia';

import './styles.css';

const handleOpen = () => {
  //this.setState({open: true});
};

const handleClose = () => {
  //this.setState({open: true});
};

const BorrowItem = () => {
    console.log("borrow");

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={handleClose}
      />,
    ];

    return (
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={false}
        >
          Only actions can close this dialog.
        </Dialog>
    )
};

const ItemCard = ({item}) => (
    <Card className="masonryItem">
        <ItemCardMedia item={item} />
        <a href={`/profile/${item.itemowner.id}`}>
        <CardHeader className="cardAvatar"
            title={item.itemowner.fullname}
            subtitle={Moment(item.created).fromNow()}
            avatar={<Gravatar email={item.itemowner.email} />}
        />
        </a>
        <CardTitle title={item.title} subtitle={item.tags.map((tag, i) =>
            i > 0 ? ', ' + tag : tag )} />
        <CardText>
            {item.description}
        </CardText>
        <CardActions>
            {item.available ?
                <div>
                    <RaisedButton label="BORROW" secondary={true} onClick={handleOpen} />
                    <BorrowItem />
                </div>
                 : ''}
        </CardActions>
    </Card>
);

ItemCard.propTypes = {
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

export default ItemCard;
