import React from 'react';
import {useSelector} from 'react-redux';

const ProfileList = () => {
    
    const profileState = useSelector(state => state.profile);

    

    return (
        <div className='profile-list-container'>
            {
                
            }        
        </div>
    )
}

export default ProfileList;
