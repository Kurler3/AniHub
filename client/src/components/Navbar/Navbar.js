import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <div className='navbar'>
            
            <div className="navbar-title">
                Ani <span className="navbar-title-span">Hub</span>
            </div>

            <div className="navbar-anime-container">
                <p>Anime</p>
                <FontAwesomeIcon icon={faArrowDown}/>
            </div>
        </div>
    )
}

export default Navbar
