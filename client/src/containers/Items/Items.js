import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import HeaderBar from '../../components/HeaderBar';
import FooterBar from '../../components/FooterBar';
import ItemCardList from '../../components/ItemCardList';

const Items = ({itemsData, tagData, tagValues, handleChange}) => {
    return (
        <div>
            <div className="appHeader">
                {/* Might want to put your header bar here... */}
                <HeaderBar tagData={tagData} tagValues={tagValues} handleChange={handleChange}/>
            </div>
            <div className="appContent">
                <ItemCardList itemsData={itemsData} />
            </div>
            {/* And a footer here, but not on the login route... */}
            <FooterBar />
        </div>
    );
}

Items.propTypes = {

};

export default Items;
