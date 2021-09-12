import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer-container">
            
            <div className="left-container">
                    <Link to="/" style={{textDecoration:'none'}} className="left-container-title">Ani<span className="left-container-title-span">Hub</span>
                    </Link>
                    
                    <p className="left-container-tab">Anime</p>
                    <p className="left-container-tab">Media</p>
                    <p className="left-container-tab">MyList</p>
            </div>

            <div className="right-container">
                <div className="right-container-media-tab">
                <FontAwesomeIcon icon={faFacebook} />
                </div>
                <div className="right-container-media-tab">
                <FontAwesomeIcon icon={faTwitter} />
                </div>
                <div className="right-container-media-tab">
                <FontAwesomeIcon icon={faGithub} />
                </div>
            </div>
        </div>
    )
}

export default Footer;
