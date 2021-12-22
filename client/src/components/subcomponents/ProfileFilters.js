import React, {useState} from 'react';
import { PROFILE_FILTERS } from '../../utils/constants';

const ProfileFilters = () => {

    const [selectedFilter, setSelectedFilter] = useState(PROFILE_FILTERS[0]); 

    const getProfileItems  = (filter) => {
        // Dispatch and update profile state array according to the filter selected
        switch(filter) {
            case PROFILE_FILTERS[0]:
                break;
            case PROFILE_FILTERS[1]:
                break;
            case PROFILE_FILTERS[2]:
                break;
            case PROFILE_FILTERS[3]:
                break;
            case PROFILE_FILTERS[4]:
                break;
            case PROFILE_FILTERS[5]:
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
                            // console.log(profileFilter);
                            if(selectedFilter!==profileFilter){
                                getProfileItems(profileFilter);
                                setSelectedFilter(profileFilter);
                            }
                        }}>
                        {profileFilter}
                    </div>
                
                )
            }
        </div>
    )
}

export default ProfileFilters;
