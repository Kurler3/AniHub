import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { useDispatch } from 'react-redux';
import CommentList from './CommentList';
import { createComment } from '../actions/commentActions';

const Post = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const postId = params.postId;

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    // Get post id from headers
    // Search for post object in state's post array.
    const fullPost = useSelector(state => state.posts.posts.find(post => post._id===postId));
    
    const [commentInput, setCommentInput] = useState('');

    const onCommentInputChange = (e) => setCommentInput(e.target.value);

    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));
    }, []);


    const onCommentSubmit = (e) => {
        e.preventDefault();

        // Check if input is not empty and dispatch action for creating comment.
        if(commentInput!=='') dispatch(createComment(loggedUser.result._id, fullPost._id, commentInput));
    }

    return (
        fullPost ? 
            <div className="post-container">
                <div className="post-card-container">
                    <PostCard post={fullPost} />
                </div>

                {
                    loggedUser!==null && 
                    
                    <div className="comment-section-container">
                        <div className="input-container">
                            <p className="comment-as-title">Comment as 
                                <Link to={`/profile/${loggedUser.result._id}`} className='name-span'>      {loggedUser.result.first_name + " " + loggedUser.result.last_name}
                                </Link>
                            </p>
                            <form onSubmit={onCommentSubmit} className="form">
                                <textarea value={commentInput} onChange={onCommentInputChange} placeholder='Comment something...' className="textarea" cols="30" rows="10"></textarea>
                                <div className="btn-container">
                                    <button type='submit' className="comment-btn">Comment</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                }
                
                <CommentList postId={fullPost._id}/>
            </div> 
            : 
            <div className="loading-container">
            <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
            </div>
    )
}

export default Post
