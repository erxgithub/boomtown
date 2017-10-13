import React from 'react';
import {Card} from 'material-ui/Card';
import Gravatar from 'react-gravatar'

import './styles.css';

const ProfileCard = ({profileData}) => (
    <Card className="profileCard">
        <div className="profile">
            <div className="profileUser">
                <p>{profileData.fullname}</p>
                <p>{profileData.bio}</p>
            </div>
            <div className="profileSummary">
                <div>
                    <div className="profileItem">
                        <p>{profileData.shared}</p>
                        <p>Items shared</p>
                    </div>
                    <div className="profileItem">
                        <p>{profileData.borrowed}</p>
                        <p>Items borrowed</p>
                    </div>
                </div>
                <div className="profileAvatar">
                    <Gravatar email={profileData.email} size={180} />
                </div>
            </div>
        </div>
    </Card>
);

export default ProfileCard;
