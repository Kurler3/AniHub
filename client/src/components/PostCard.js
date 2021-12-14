import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { getUserInfo, searchCommunity } from '../api';
import ReactLoading from 'react-loading';
import { timeAgo } from '../utils/helper_functions';
import {useDispatch} from 'react-redux';
import { deletePost, votePost } from '../actions/mediaActions';
import {Link} from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { VOTE_STATES } from '../utils/constants';
import VotingContainer from './subcomponents/VotingContainer';



const PostCard = ({post}) => {

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [postUser, setPostUser] = useState(null);

    const [postCommunity, setPostCommunity] = useState(null);

    const [isShowDelPopUp, setIsShowDelPopUp] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));

        if(postUser===null) fetchUserInfo();

        if(postCommunity===null) fetchCommunityInfo();
    },[postUser]);

    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo(post.created_by);
        setPostUser(userInfo.data.data);
    }

    const fetchCommunityInfo = async () => {
        const communityInfo = await searchCommunity(post.community_title);

        setPostCommunity(communityInfo.data.data);
    }

    const onUpVoteClick = () => {
        if(loggedUser!==null){
            dispatch(votePost(post._id, loggedUser.result._id, true));
        }
    }

    const onDownVoteClick = () => {
        if(loggedUser!==null){
            dispatch(votePost(post._id, loggedUser.result._id, false));
        }
    }


    // Check if logged user has permission to delete post
    const hasPermissions = () => {
        // If have community and loggedUser then check
        if(postCommunity!==null && loggedUser!==null) {
            // return whether the logged user is an admin or moderator 
            return postCommunity.admins.includes(loggedUser.result._id) || postCommunity.moderators.includes(loggedUser.result._id);
        }
    }

    // Delete post action 
    const onDeleteBtnClicked = () => {
        dispatch(deletePost(post._id));
        
        // Close pop-up
        setIsShowDelPopUp(false);
    }

    return (

        postUser!==null ? 

        <div className="post-tab-container">

            <VotingContainer item={post} onDownVoteClicked={onDownVoteClick} onUpVoteClicked={onUpVoteClick} />

            <div className="right-container">
                <div className="created-by-container">
                    <Link to={`/media/${post.community_title}`} className="community">{post.community_title}</Link>
                    <Link to={`/profile/${postUser._id}`} className="posted-by">Posted by {postUser.first_name} {postUser.last_name}</Link>
                    <p className="time-created">{timeAgo(post.created_at)}</p>
                </div>
                <Link to={`/posts/${post._id}`} className="title" style={{textDecoration:'none', color:'white'}}>
                    {post.title}
                </Link>
                {
                    post.img!=='' && 
                    <div className="img-container">
                        <img src={post.img} alt="post_image"/>
                    </div>
                }

                <Link to={`/posts/${post._id}`} className="comments-container" style={{textDecoration:'none'}}>
                    <div className="comments-tab">
                        <div className="comment-icon">
                            <FontAwesomeIcon icon={faCommentAlt} />
                        </div>
                        <p className="total-comments">{post.comments.length} Comments</p>
                    </div>
                </Link>
            </div>

            {
                hasPermissions() && 

                <div className="permissions-container">
                    <button onClick={() => setIsShowDelPopUp(true)} className="delete-btn">
                        Delete
                    </button>
                </div>
            }

            {
                isShowDelPopUp && 
                <div className="delete-pop-up-container">
                    <div className="close-icon-btn-container" onClick={() => setIsShowDelPopUp(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <p className="title">Are you sure you want to delete this post?</p>
                    <div className="btns-container">
                        <button onClick={() => setIsShowDelPopUp(false)} className="cancel-btn btn">
                            Cancel
                        </button>
                        <button onClick={onDeleteBtnClicked} className="btn confirm-btn">
                            Confirm
                        </button>
                    </div>
                </div>
            }

        </div> 
        
        :

        <div className="loading-container">
            <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
        </div>
    )
}

export default PostCard;
