import React from 'react';
import {useParams} from 'react-router-dom';

const Profile = () => {

    const params = useParams();

    const userId = params.id;

    return (
        <div>
            {userId}
        </div>
    )
}

export default Profile
