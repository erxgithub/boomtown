import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import ItemCardList from '../../components/ItemCardList';

const Items = ({itemsData}) => {
    return (
        <div className="appContent">
            <ItemCardList itemsData={itemsData} />
        </div>
    );
}

Items.propTypes = {

};

export default Items;
