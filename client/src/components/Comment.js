import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import { timeAgo } from '../utils/helper_functions';
import VotingContainer from './subcomponents/VotingContainer';
import {faCommentAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch} from 'react-redux';
import {getUserInfo} from '../api/index';
import ReactLoading from 'react-loading';
import ReplyCommentInput from './subcomponents/ReplyCommentInput';
import { voteComment } from '../actions/commentActions';

const Comment = ({commentId}) => {

    const dispatch = useDispatch();

    const comment = useSelector(state => state.comments.find((commentItem) => commentItem._id === commentId));;

    const [showingContent, setShowingContent] = useState(true);

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [commentingUser, setCommentingUser] = useState(null); 

    const [showCommentInput, setShowCommentInput] = useState(false);

    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));

        if(commentingUser===null) getCommentingUserInfo();
    }, []);

    const getCommentingUserInfo = async () => {
        const info = await getUserInfo(comment.created_by);

        setCommentingUser(info.data.data);
    }

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

        commentingUser!==null ?

        <div className='comment-container'>

            <div className="left-container">
                <img src={commentingUser.avatar_img} alt="profile-pic" className="profile-pic" />
                {
                    showingContent ? 
                    <div onClick={() => setShowingContent(false)} className="line-container"><div className="line"></div></div>
                        :
                    <div onClick={() => setShowingContent(true)} className='show-content-icon-container'>
                        <FontAwesomeIcon icon={faExpandArrowsAlt}/>
                    </div>
                }
            </div>

            <div className="right-container">
                    <div className="poster-container">
                        <div className="poster-name">{`${commentingUser.first_name} ${commentingUser.last_name}`}</div>
                        <div className="created-at">{timeAgo(comment.created_at)}</div>
                    </div>

                    {
                        showingContent ?

                        <div>    
                    <div className="content-container">{comment.text}</div>

                    <div className="voting-comment-container">

                        <VotingContainer item={comment} onDownVoteClicked={onDownVoteClicked} onUpVoteClicked={onUpVoteClicked}/>

                        <button className="comment-btn" onClick={() => setShowCommentInput(!showCommentInput)}>
                            <div className="icon">
                                <FontAwesomeIcon icon={faCommentAlt} />
                            </div>
                            <p className="btn-text">Reply</p>
                        </button>

                    </div> 

                    {
                        showCommentInput && loggedUser!==null && 
                        <ReplyCommentInput commentId={comment._id} loggedUser={loggedUser.result} postId={comment.post_id} />
                    }

                    {
                        // Fetch subcomments if this comment's sub_comments array is not empty
                        // Each displayed sub_comment will be rendered as a Comment


                        comment.sub_comments.length > 0 && 

                        <div className='sub-comment-list-container'>
                            {
                                comment.sub_comments.map((subCommentId) => <Comment key={subCommentId.toString()} commentId={subCommentId}/>)
                            }
                        </div>
                    }

                    </div>
                    
                        :
                        <div></div>
                    }
            </div>
        </div> 

            :

        <div className="loading-container">
            <ReactLoading className='loading' type='bars' color='#FFBC1E' height={50} width={50} />
        </div>
    )
}

export default Comment;
