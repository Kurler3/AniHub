import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CreateMediaPost = ({user}) => {
    return (
        <div className="media-post-input-container">
            {
                user.avatar_img.length > 0 ? 
                <img src={user.avatar_img} alt="avatar" className="user-avatar" /> 
                    : 
                <div className="avatar-text-container">
                    <p className="text">{user.first_name[0]}</p>
                </div>
            }
            
            <Link to='/media/submit/post' style={{textDecoration:'none', width:'100%'}} > 
                <input type="text" name="post_content" className="post-content-input" placeholder="Create Post" />
            </Link>
            <div className="icon-container">
            <FontAwesomeIcon icon={faFileImage} className="icon"/>
            </div>
            
            <div className="icon-container">
            <FontAwesomeIcon icon={faLink} className="icon"/>
            </div>
        </div>
    )
}

export default CreateMediaPost;
