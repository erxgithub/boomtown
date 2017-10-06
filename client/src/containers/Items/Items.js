import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import ItemCardList from '../../components/ItemCardList';

const Items = ({itemsData}) => {
    if (itemsData !== undefined && itemsData.length > 0) {
        console.log(itemsData);

        return (
            <ItemCardList itemsData={itemsData} />
        );
    } else {
        return(
            <div>
            </div>
        );
    }
}

Items.propTypes = {

};

export default Items;
