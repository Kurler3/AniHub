import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {useLocation, useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { CLEAR_LIST, LOGOUT } from '../utils/action_constants';
import { getAnimeList } from '../actions/backAnimeActions';
import { searchAnime } from '../actions/frontAnimeActions';

const TABS = {
    Anime: 'Anime',
    Media: 'Media',
    MyList:'MyList',
}

const Navbar = () => {

    // Converts from json to js object if there is a user logged in
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [currentActiveTab, setCurrentActiveTab] = useState(TABS.Anime);

    const [searchInput, setSearchInput] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        //console.log(searchInput);

        // Update front animes state
        if(searchInput.length >= 3){
            dispatch(searchAnime(searchInput));

            // Set current page to homepage
            history.push('/');
        }
    }

    const onSearchInputChange = (e) => setSearchInput(e.target.value)
    

    // const onProfileClick = () => {

    // }

    const onLogout = () => {
        // Just dispatch the logout action
        dispatch({type:LOGOUT});

        // Clear back anime storage
        dispatch({type:CLEAR_LIST});

        // Push back to homepage
        history.push('/');

        // Set user to null since he logged out
        setUser(null);
    }

    // Navbar will react everytime user moves from /auth to /, for example
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));

        // if the user is logged in, fetch their favorite animes list
        if(JSON.parse(localStorage.getItem('profile'))!==null) dispatch(getAnimeList());
    },
    [location, dispatch]);

    return (
        <div className='navbar'>
            
            <Link to="/" className="navbar-title" style={{textDecoration:'none'}}>
                Ani<span className="navbar-title-span">Hub</span>
            </Link>
            
            <Link to="/" style={{textDecoration:'none'}} className={`navbar-link navbar-anime-container ${currentActiveTab===TABS.Anime ? 'active-tab' : ''}`} onClick={()=>{setCurrentActiveTab(TABS.Anime)}}>
                <p>Anime</p>
                <FontAwesomeIcon className="down-arrow-icon" icon={faAngleDown}/>
            </Link>

            <Link to="/media" style={{textDecoration:'none'}} className={`navbar-link navbar-anime-container ${currentActiveTab===TABS.Media ? 'active-tab' : ''}`} onClick={()=>{setCurrentActiveTab(TABS.Media)}}>
                <p>Media</p>
                <FontAwesomeIcon className="down-arrow-icon" icon={faAngleDown}/>
            </Link>

            <Link to="/list" style={{textDecoration:'none'}} className={`navbar-link navbar-anime-container ${currentActiveTab===TABS.MyList ? 'active-tab' : ''}`} onClick={()=>{setCurrentActiveTab(TABS.MyList)}}>
                <p>My List</p>
                <FontAwesomeIcon className="down-arrow-icon" icon={faAngleDown}/>
            </Link>

            <form onSubmit={onSubmit} className="navbar-form-container">
                <input onChange={onSearchInputChange} type="text" name="search" className="search-input" placeholder="Search for your favorite anime" value={searchInput}/>
                <button type="submit" className="search-btn">
                    <FontAwesomeIcon  icon={faSearch} />
                </button>
            </form>

            {
                user===null ? 
                
                <div className="navbar-login-signup-container">
                    <Link to="/auth" style={{textDecoration:'none'}}>
                        <button className="auth-btn">
                            Login/Signup 
                        </button>
                    </Link>
                </div> 
            
            : 
                
                    <Link to={`/profile/${user.result._id}`} className="navbar-profile-container" style={{textDecoration:'none', color:'black'}}>
                        <div className="profile-name-container">
                            <p className="profile-name">Hello, <span className="profile-name-span">{`${user.result.first_name}`}</span></p>
                            <FontAwesomeIcon className="down-arrow-icon" icon={faAngleDown}/>
                        </div>
                        <div className="profile-avatar-container">
                            {/* <img className="profile-avatar-image" src={exampleAvatar} alt="profile_avatar" /> */}
                            {user.result.avatar_img.length > 0 ? <img className="profile-avatar-image" src={user.result.avatar_img} alt="profile_avatar"/> : <p className="profile-avatar-no-image">{user.result.first_name[0]}</p>}
                        </div>
                    </Link>
            }

            {
                user!==null ? <button onClick={onLogout} className="logout-btn">
                Logout
            </button> : <div></div>
            }
        </div>
    )
}

export default Navbar
