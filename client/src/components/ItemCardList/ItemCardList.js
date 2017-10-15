import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import './styles.css';

import ItemCard from '../../components/ItemCard';

const ItemCardList = ({itemsData}) => (
    <Masonry className="masonryGrid">
        {itemsData.map(item =>
            <ItemCard key={item.id} item={item} />
        )}
    </Masonry>
);

ItemCardList.propTypes = {
    itemsData: PropTypes.array
};

export default ItemCardList;
