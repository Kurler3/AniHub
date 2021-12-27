import React from 'react';
import { PROFILE_FILTERS } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileFilter, getProfileComments, getProfilePosts, getVotedPosts } from '../../actions/profileActions';

const ProfileFilters = ({userId}) => {

    const dispatch = useDispatch();

    const selectedFilter = useSelector(state => state.profile.type); 

    const getProfileItems  = (filter) => {
        // Dispatch and update profile state array according to the filter selected
        switch(filter) {
            case PROFILE_FILTERS[0]:
                // No need to fetch data, just update the type
                dispatch(changeProfileFilter(PROFILE_FILTERS[0]));
                break;
            case PROFILE_FILTERS[1]:
                // No need to fetch data, just update the type
                dispatch(changeProfileFilter(PROFILE_FILTERS[1]));
                break;
            case PROFILE_FILTERS[2]:
                dispatch(getProfilePosts(userId));
                break;
            case PROFILE_FILTERS[3]:
                dispatch(getProfileComments(userId));
                break;
            case PROFILE_FILTERS[4]:
                dispatch(getVotedPosts(userId, true));
                break;
            case PROFILE_FILTERS[5]:
                dispatch(getVotedPosts(userId, false));
                break;
            default:
                break;
        }
    }

    return (
        <div className='profile-filters-container'>
            {
                PROFILE_FILTERS.map((profileFilter, index) => 
                
                    <div key={index} className={`filter ${selectedFilter===profileFilter ? 'highlighted' : ''}`} name={profileFilter}

                        onClick={() => {
                            if(selectedFilter!==profileFilter) getProfileItems(profileFilter);
                        }}>
                        {profileFilter}
                    </div>
                
                )
            }
        </div>
    )
}

export default ProfileFilters;
