import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import Gravatar from 'react-gravatar'

import './styles.css';

const Profile = ({item}) => (
    <Card className="masonryItem">
        <CardHeader className="cardAvatar"
            title="Mandi Wise"
            subtitle="Learn'em good."
            avatar={<Gravatar email="mandi@redacademy.com" />}
        />
    </Card>
);

export default Profile;
