import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';

import exampleAvatar from './../example_profile_avatar.jpg';

const TABS = {
    Anime: 'Anime',
    Media: 'Media',
    MyList:'MyList',
}

const Navbar = () => {

    const [currentActiveTab, setCurrentActiveTab] = useState(TABS.Anime);

    const [searchInput, setSearchInput] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onSearchInputChange = (e) => setSearchInput(e.target.value);

    const onProfileClick = () => {
        
    }

    return (
        <div className='navbar'>
            
            <div className="navbar-title">
                Ani<span className="navbar-title-span">Hub</span>
            </div>
            
            <div className={`navbar-link navbar-anime-container ${currentActiveTab===TABS.Anime ? 'active-tab' : ''}`} onClick={()=>{setCurrentActiveTab(TABS.Anime)}}>
                <p>Anime</p>
                <FontAwesomeIcon className="down-arrow-icon" icon={faAngleDown}/>
            </div>

            <div className={`navbar-link navbar-anime-container ${currentActiveTab===TABS.Media ? 'active-tab' : ''}`} onClick={()=>{setCurrentActiveTab(TABS.Media)}}>
                <p>Media</p>
                <FontAwesomeIcon className="down-arrow-icon" icon={faAngleDown}/>
            </div>

            <div className={`navbar-link navbar-anime-container ${currentActiveTab===TABS.MyList ? 'active-tab' : ''}`} onClick={()=>{setCurrentActiveTab(TABS.MyList)}}>
                <p>My List</p>
                <FontAwesomeIcon className="down-arrow-icon" icon={faAngleDown}/>
            </div>

            <form onSubmit={onSubmit} className="navbar-form-container">
                <input onChange={onSearchInputChange} type="text" name="search" className="search-input" placeholder="Search for your favorite anime" value={searchInput}/>
                <button type="submit" className="search-btn">
                    <FontAwesomeIcon  icon={faSearch} />
                </button>
            </form>

            <div className="navbar-profile-container" onClick={onProfileClick}>
                <div className="profile-name-container">
                    <p className="profile-name">Hello, <span className="profile-name-span">Sam</span></p>
                    <FontAwesomeIcon className="down-arrow-icon" icon={faAngleDown}/>
                </div>
                <div className="profile-avatar-container">
                    <img className="profile-avatar-image" src={exampleAvatar} alt="profile_avatar" />
                </div>
            </div>
        </div>
    )
}

export default Navbar
