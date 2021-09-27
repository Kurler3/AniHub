import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {useLocation, useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import exampleAvatar from '../example_profile_avatar.jpg'
import { LOGOUT } from '../utils/action_constants';
import { getAnimeList } from '../actions/backAnimeActions';

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
    }

    const onSearchInputChange = (e) => setSearchInput(e.target.value);

    const onProfileClick = () => {
        
    }

    const onLogout = () => {
        // Just dispatch the logout action
        dispatch({type:LOGOUT});

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

            <Link to="/" style={{textDecoration:'none'}} className={`navbar-link navbar-anime-container ${currentActiveTab===TABS.Media ? 'active-tab' : ''}`} onClick={()=>{setCurrentActiveTab(TABS.Media)}}>
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
                
                    <div className="navbar-profile-container" onClick={onProfileClick}>
                        <div className="profile-name-container">
                            <p className="profile-name">Hello, <span className="profile-name-span">{`${user.result.first_name}`}</span></p>
                            <FontAwesomeIcon className="down-arrow-icon" icon={faAngleDown}/>
                        </div>
                        <div className="profile-avatar-container">
                            <img className="profile-avatar-image" src={exampleAvatar} alt="profile_avatar" />
                        </div>
                    </div>
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
