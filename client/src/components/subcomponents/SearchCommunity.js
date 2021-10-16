import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { searchCommunity } from '../../actions/communityActions';

const SearchCommunity = () => {

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    // Converts from json to js object if there is a user logged in
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [filteredCommunities, setFilteredCommunities] = useState([]);

    const onInputChange = (e) => {

        if(e.target.value !== '')
            setFilteredCommunities(user.result.communities_subscribed.filter((communityName) => communityName.startsWith(e.target.value)));
        else setFilteredCommunities([]); 
    }
    
    const onInputClick = () => {
        if(user === null) {
            // redirect to search community page
        }
    }

    const onCommunitySearchTabClick = (communityName) => { 
        history.push(`/media/r/${communityName}`);
        // dispatch(searchCommunity(communityName, history));
    }
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    },
    [location]);

    return (
        <div className="search-community">
            <div className="input-container">
                <input onClick={onInputClick} onChange={onInputChange} type="text" placeholder="Search a community" className="search-input" />
                <FontAwesomeIcon className="icon" icon={faSearch} />
            </div>

            { filteredCommunities.length > 0 ? 
                <div className="list-container">
                    {
                        filteredCommunities.map(communityName => 
                            <div
                            onClick={() => onCommunitySearchTabClick(communityName)}
                            className="community-search-tab" key={communityName}>{communityName}
                            </div>
                        )
                    }
                </div>
                
                :
                
                <div></div>
            }
        </div>
    )
}

export default SearchCommunity;
