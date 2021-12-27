import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { voteComment } from '../actions/commentActions';
import { timeAgo } from '../utils/helper_functions';
import VotingContainer from './subcomponents/VotingContainer';

const ProfileCommentCard = ({comment, commentingUser}) => {

    const dispatch = useDispatch();

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));


    const onDownVoteClicked = () => {
        if(loggedUser!==null) {
            dispatch(voteComment(false, loggedUser.result._id, comment._id));
        }
    }

    const onUpVoteClicked = () => {
        if(loggedUser!==null) {
            dispatch(voteComment(true, loggedUser.result._id, comment._id));
        }
    }

    return (
        <div className='comment-container'>

            <div className="left-container">
                <img src={commentingUser.avatarImg} alt="profile-pic" className="profile-pic" />
            </div>

            <div className="right-container">
                    <div className="poster-container">
                        <div className="poster-name">{`${commentingUser.firstName} ${commentingUser.lastName}`}</div>
                        <div className="created-at">{timeAgo(comment.created_at)}</div>
                    </div>

                    

                        <div>    
                    <div className="content-container">{comment.text}</div>

                    <div className="voting-comment-container">

                        <VotingContainer item={comment} onDownVoteClicked={onDownVoteClicked} onUpVoteClicked={onUpVoteClicked}/>

                    </div> 
                    </div>
                    
            </div>
        </div> 
    )
}

export default ProfileCommentCard;
