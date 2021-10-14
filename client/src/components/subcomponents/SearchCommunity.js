import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import {searchCommunities} from '../../actions/communityActions';

const SearchCommunity = () => {

    const dispatch = useDispatch();

    const communities = useSelector(state => state.community.searchList);

    const onInputChange = (e) => dispatch(searchCommunities(e.target.value));

    return (
        <div className="search-community">
            <input onChange={onInputChange} type="text" placeholder="Search a community" className="search-input" />
            <FontAwesomeIcon className="icon" icon={faSearch} />

            { communities.length > 0 ? 
                <div className="list-container">
                    {
                        communities.map(community => 
                            <div key={community._id}>{community.title}</div>
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
