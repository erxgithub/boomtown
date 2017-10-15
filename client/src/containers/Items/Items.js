import React from 'react';
import PropTypes from 'prop-types';
import Progress from '../../components/Progress';
import './styles.css';

import HeaderBar from '../../components/HeaderBar';
import FooterBar from '../../components/FooterBar';
import ItemCardList from '../../components/ItemCardList';
import ProfileCard from '../../components/ProfileCard';

const Items = ({itemsData, tagData, tagValues, profileData, isLoading, handleChange}) => {
    if (isLoading) {
        return (
            <Progress />
        );
    } else {
        console.log(itemsData);
        console.log(tagValues);
        console.log(profileData);

        return (
            <div className="appContent">
                <div className="appHeader">
                    {/* Might want to put your header bar here... */}
                    <HeaderBar
                        tagData={tagData}
                        tagValues={tagValues}
                        handleChange={handleChange}
                    />
                </div>
                {profileData !== undefined && profileData.shared > 0 ?
                    <div className="profileSection">
                        <ProfileCard profileData={profileData} />
                    </div>
                : ''}
                {itemsData !== undefined && itemsData.length > 0 ?
                    <div className="appItems">
                        <ItemCardList itemsData={itemsData} />
                    </div>
                : ''}
                {/* And a footer here, but not on the login route... */}
                <FooterBar />
            </div>
        );
    }
}

Items.propTypes = {
    itemsData: PropTypes.array,
    tagData: PropTypes.array,
    tagValues: PropTypes.array,
    profileData: PropTypes.shape({
        id: PropTypes.string,
        fullname: PropTypes.string,
        email: PropTypes.string,
        bio: PropTypes.string,
        shared: PropTypes.number,
        borrowed: PropTypes.number,
        borroweditems: PropTypes.array
    }),
    isLoading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Items;
