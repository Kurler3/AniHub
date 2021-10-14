import React from 'react';
import {useSelector} from 'react-redux';

const Community = () => {

    const community = useSelector((state) => state.community['current']);
    console.log(community);

    return (
        <div className="community-container">
            <p>{community.title}</p>
            <img src={community.avatar_img} alt="avatar" />
        </div>
    )
}

export default Community;
