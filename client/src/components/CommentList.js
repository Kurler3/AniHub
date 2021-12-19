import React, {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getComments} from '../actions/commentActions';
import Comment from './Comment';


const CommentList = ({post}) => {

    const dispatch = useDispatch();

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const comments = useSelector(state => state.comments);

    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));

        // if(post.comments.length > 0 && comments.length===0) dispatch(getComments(post._id));
        dispatch(getComments(post._id));
        
        console.log(comments);
    },[]);

    return (
        <div>
            {
                    comments.length > 0 ? 
                    <div className="comment-list-container">
                        
                        { 
                        // If its a main comment then its going to render
                            comments.map((comment) => !comment.is_sub_comment ? <Comment key={comment._id.toString()} commentId={comment._id}/> : <div></div>)                
                        }

                    </div>

                    : 
                        
                    <div className="no-comments">No Comments</div>
                }
        </div>
    )
}

export default CommentList;
