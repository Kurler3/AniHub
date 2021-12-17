import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { replyComment } from '../../actions/commentActions';

const ReplyCommentInput = ({commentId, loggedUser, postId}) => {

    const dispatch = useDispatch();

    const [inputData, setInputData] = useState('');

    const onReplayCommentSubmit = (e) => {
        e.preventDefault();

        // Dispatch action that adds new sub_comment to this comments object in db
        if(inputData!=='') dispatch(replyComment(commentId, loggedUser._id, postId, inputData));
    }

    return (
        <form onSubmit={onReplayCommentSubmit} className='reply-comment-input-container'>
            
            <img src={loggedUser.avatar_img} alt="avatar" className="logged-user-avatar" />

            <input placeholder='Reply with something...' type='text' onChange={(e) => setInputData(e.target.value)} value={inputData} className='input'/>
            
            <button type='submit' className='reply-btn'>
                    Reply
            </button>
        </form>
    )
}

export default ReplyCommentInput;
