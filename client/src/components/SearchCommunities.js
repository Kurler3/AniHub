import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchCommunities = () => {

    const params = useParams();

    const [searchInput, setSearchInput] = useState(params.defaultSearchInput!==undefined ? params.defaultSearchInput : '');

    const searchedCommunityList = useSelector(state => state.community.searchList);

    const onSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    }

    const onInputSubmit = (e) => {
        e.preventDefault();

        // Dispatch
    }

    return (
        <div className="search-communities-container">
            <form onSubmit={onInputSubmit} className="search-input-container">
                <input type="text" className="search-input" defaultValue={params.defaultSearchInput!==undefined ? params.defaultSearchInput : ''} onChange={onSearchInputChange}/>
                <button type="submit" className="submit-btn">
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </form>
            
            {searchedCommunityList.length > 0 ? 
            
                <div className="community-list">

                </div>    

                    :

                <div >
                    No Communities
                </div>
            }
            
        </div>
    )
}

export default SearchCommunities;
