import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import { timeAgo } from '../utils/helper_functions';
import VotingContainer from './subcomponents/VotingContainer';
import {faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import {getUserInfo} from '../api/index';
import ReactLoading from 'react-loading';

const Comment = ({comment}) => {

    const location = useLocation();

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [commentingUser, setCommentingUser] = useState(null); 

    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));

        if(commentingUser===null) getCommentingUserInfo();
    }, [location]);
    
    const getCommentingUserInfo = async () => {
        const info = await getUserInfo(comment.created_by);

        setCommentingUser(info.data.data);
    }

    const onDownVoteClicked = () => {
        if(loggedUser!==null) {
            // Dispatch for liking comment :))))
        }
    }

    const onUpVoteClicked = () => {
        if(loggedUser!==null) {

        }
    }

    return (

        commentingUser!==null ?

        <div className='comment-container'>
            <div className="upper-container">
                <div className="left-container">
                    <img src={commentingUser.avatar_img} alt="profile-pic" className="profile-pic" />
                </div>

                <div className="right-container">
                    <div className="poster-container">
                        <div className="poster-name">{`${commentingUser.first_name} ${commentingUser.last_name}`}</div>
                        <div className="created-at">{timeAgo(comment.created_at)}</div>
                    </div>
                        
                    <div className="content-container">{comment.text}</div>

                    <div className="voting-comment-container">
                        <button className="comment-btn">
                            <FontAwesomeIcon icon={faCommentAlt} />
                            <p className="btn-text">Reply</p>
                        </button>
                        

                        
                        <VotingContainer item={comment} onDownVoteClicked={onDownVoteClicked} onUpVoteClicked={onUpVoteClicked}/>
                    </div> 
                </div>
                
            </div>
            
            
        </div> 

            :

        <div className="loading-container">
            <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
        </div>
    )
}

export default Comment;
