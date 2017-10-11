import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import ProfileCard from '../../components/ProfileCard';
import ItemCardList from '../../components/ItemCardList';

const Profile = ({itemsData, profileData}) => {
    return (
        <div>
            <div className="profileSection">
                <ProfileCard itemsData={itemsData} profileData={profileData} />
            </div>
            <div className="appContent">
                <ItemCardList itemsData={itemsData} />
            </div>
        </div>
    );
}

Profile.propTypes = {

};

export default Profile;
