import React from 'react';
import {Card} from 'material-ui/Card';
import Gravatar from 'react-gravatar'

import './styles.css';

const Profile = ({item}) => (
    <Card className="profileCard">
        <div className="profile">
            <div className="profileUser">
                <p>Mandi Wise</p>
                <p>{"Learn'em good."}</p>
            </div>
            <div className="profileSummary">
                <div>
                    <div className="profileItem">
                        <p>6</p>
                        <p>Items shared</p>
                    </div>
                    <div className="profileItem">
                        <p>3</p>
                        <p>Items borrowed</p>
                    </div>
                </div>
                <div className="profileAvatar">
                    <Gravatar email="mandi@redacademy.com" size={180} />
                </div>
            </div>
        </div>
    </Card>
);

export default Profile;
