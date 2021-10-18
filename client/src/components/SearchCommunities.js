import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {getAllCommunities} from '../actions/communityActions';
import ReactLoading from 'react-loading';

const SearchCommunities = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const [gotAllCommunities, setGotAllCommunities] = useState(false);
    const [searchInput, setSearchInput] = useState(params.defaultSearchInput!==undefined ? params.defaultSearchInput : '');

    const searchedCommunityList = useSelector(state => state.community.searchList);

    const onSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    }

    const onInputSubmit = (e) => {
        e.preventDefault();

        // Dispatch
    }

    useEffect(() => {
        // Initially show all communities available
        if(!gotAllCommunities){
            dispatch(getAllCommunities());
            setGotAllCommunities(true);
        } 
    },[gotAllCommunities, dispatch]);

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
                    {searchedCommunityList.map((community) => (
                        <div key={community.title} className="community-tab">
                            <img className="avatar" src={community.avatar_img} alt="avatar" />
                            <p className="title">{community.title}</p>
                        </div>
                        )
                    )
                    }
                </div>    

                    :

                <div className="no-communities">
                    <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
                </div>
            }
            
        </div>
    )
}

export default SearchCommunities;
