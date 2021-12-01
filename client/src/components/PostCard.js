import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { getUserInfo } from '../api';
import ReactLoading from 'react-loading';
import { timeAgo } from '../utils/helper_functions';

const PostCard = ({post}) => {

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [postUser, setPostUser] = useState(null);

    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));

        if(postUser===null) fetchUserInfo();
    },[postUser]);

    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo(post.created_by);


        console.log(userInfo.data.data);
        setPostUser(userInfo.data.data);
    }

    return (

        postUser!==null ? 

        <div className="post-tab-container">
            <div className="voting-container">
                <div className="vote-icon up">
                    <FontAwesomeIcon icon={faArrowUp} />
                </div>
                <p className="total-votes">{post.upvoted_by.length - post.downvoted_by.length}</p>
                <div className="vote-icon down">
                    <FontAwesomeIcon icon={faArrowDown} />
                </div>
            </div>

            <div className="right-container">
                <div className="created-by-container">
                    <p className="community">{post.community_title}</p>
                    <p className="posted-by">Posted by {postUser.first_name} {postUser.last_name}</p>
                    <p className="time-created">{timeAgo(post.created_at)}</p>
                </div>
                <div className="title">
                    {post.title}
                </div>
                {
                    post.img!=='' && 
                    <div className="img-container">
                        <img src={post.img} alt="post_image"/>
                    </div>
                }

                <div className="comments-container">
                    <div className="comments-tab">
                        <div className="comment-icon">
                            <FontAwesomeIcon icon={faCommentAlt} />
                        </div>
                        <p className="total-comments">{post.comments.length} Comments</p>
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

export default PostCard;
