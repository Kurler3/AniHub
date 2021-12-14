import React, {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getComments } from '../actions/commentActions';
import Comment from './Comment';


const CommentList = ({postId}) => {

    const dispatch = useDispatch();

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const comments = useSelector(state => state.comments);
    
    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));

        dispatch(getComments(postId));
    });

    return (
        <div>
            {
                    comments.length > 0 ? 
                    <div className="comment-list-container">
                    
                        { 
                            comments.map((comment) => <Comment key={comment._id} comment={comment}/>)                
                        }

                    </div>

                    : 
                        
                    <div className="no-comments">No Comments</div>
                }
        </div>
    )
}

export default CommentList;
