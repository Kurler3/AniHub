import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import {getAllCommunities, searchCommunities} from '../actions/communityActions';
import ReactLoading from 'react-loading';
import {Link} from 'react-router-dom';

const SearchCommunities = ({match}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const {defaultSearchInput} = match.params;

    const params = useParams();
    const dispatch = useDispatch();

    const [gotCommunities, setGotCommunities] = useState(false);


    const [searchInput, setSearchInput] = useState(defaultSearchInput!==undefined ? defaultSearchInput : '');


    const searchedCommunityList = useSelector(state => state.community.searchList);

    const onSearchInputChange = (e) => setSearchInput(e.target.value);
    
    const onInputSubmit = (e) => {
        e.preventDefault();
        // Dispatch search communities with value inputted
        if(searchInput.length > 0) dispatch(searchCommunities(searchInput));
        else dispatch(getAllCommunities());
    }

    useEffect(() => {

        // if the user is null, keep checking for a possible login
        if(user===null) setUser(JSON.parse(localStorage.getItem('profile')));

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
                            <Link to={`/media/${community.title}`} style={{textDecoration:'none', color:'white'}}                   className="community-tab">
                                <img className="avatar" src={community.avatar_img} alt="avatar" />
                                <p className="title">{community.title}</p>
                                {
                                    // if theres an user logged in and he owns any of the communities displayed, then show a little star 
                                    // on the component
                                }
                                {user!==null && community.admins.includes(user.result._id) &&
                                    <FontAwesomeIcon icon={faStar}/>
                                }
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
