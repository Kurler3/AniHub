import React from 'react';

const Footer = () => {
    return (
        <div className="footer-container">
            
            <div className="left-container">
                    <h1 className="left-container-title">Ani<span className="left-container-title-span">Hub</span></h1>
                    
                    <p className="left-container-tab">Anime</p>
                    <p className="left-container-tab">Media</p>
                    <p className="left-container-tab">MyList</p>
            </div>

            <div className="right-container">
                <div className="right-container-media-tab">
                    Face
                </div>
                <div className="right-container-media-tab">
                    Twitter
                </div>
                <div className="right-container-media-tab">
                    Git
                </div>
            </div>
        </div>
    )
}

export default Footer;
