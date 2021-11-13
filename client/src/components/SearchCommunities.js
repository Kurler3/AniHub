import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {getAllCommunities, searchCommunities} from '../actions/communityActions';
import ReactLoading from 'react-loading';
import {Link} from 'react-router-dom';

const SearchCommunities = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const [gotCommunities, setGotCommunities] = useState(false);

    const [searchInput, setSearchInput] = useState(params.defaultSearchInput!==undefined ? params.defaultSearchInput : '');

    //console.log(searchInput);

    const searchedCommunityList = useSelector(state => state.community.searchList);

    const onSearchInputChange = (e) => setSearchInput(e.target.value);
    
    const onInputSubmit = (e) => {
        e.preventDefault();
        // Dispatch search communities with value inputted
        if(searchInput.length > 0) dispatch(searchCommunities(searchInput));
        else dispatch(getAllCommunities());
    }

    useEffect(() => {
        // Initially show all communities available
        if(!gotCommunities && searchInput.length===0){
            dispatch(getAllCommunities());
            setGotCommunities(true);
        } else if (!gotCommunities && searchInput.length > 0){
            // Initially search communities that start with this input
            dispatch(searchCommunities(searchInput));
            setGotCommunities(true);
        }
    }, [dispatch, gotCommunities, searchInput]);

    return (
        <div className="search-communities-container">
            <form onSubmit={onInputSubmit} className="search-input-container">
                <input placeholder="Search for a community..." type="text" className="search-input" defaultValue={params.defaultSearchInput!==undefined ? params.defaultSearchInput : ''} onChange={onSearchInputChange}/>
                <button type="submit" className="submit-btn">
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </form>
            
            {searchedCommunityList.length > 0 ? 
                    <div className="community-list">
                    {searchedCommunityList.map((community) => (
                        <div key={community.title}>
                            <Link to={`/media/${community.title}`} style={{textDecoration:'none', color:'white'}} className="community-tab">
                                <img className="avatar" src={community.avatar_img} alt="avatar" />
                                <p className="title">{community.title}</p>
                            </Link>
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
