import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router';

const SearchCommunity = () => {

    const location = useLocation();
    const history = useHistory();

    // Converts from json to js object if there is a user logged in
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [filteredCommunities, setFilteredCommunities] = useState([]);
    const [input, setInput] = useState('');

    const onInputChange = (e) => {
        setInput(e.target.value);

        if(e.target.value !== '')
            setFilteredCommunities(user.result.communities_subscribed.filter((communityName) => communityName.startsWith(e.target.value)));
        else setFilteredCommunities([]); 
    }
    
    const onInputClick = () => {
        if(user === null) {
            // redirect to search community page
            history.push('/media/search');
        }
    }

    const onCommunitySearchTabClick = (communityName) => history.push(`/media/r/${communityName}`);
    
    const onClickSearch = () => history.push(`/media/search${input!=='' ? `/${input}` : ''}`);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    },
    [location]);

    return (
        <div className="search-community">
            <div className="input-container">
                <input onClick={onInputClick} onChange={onInputChange} type="text" placeholder="Search a community" className="search-input" />
                <FontAwesomeIcon onClick={onClickSearch} className="icon" icon={faSearch} />
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
