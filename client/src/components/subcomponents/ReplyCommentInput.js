import React, {useState} from 'react';

const ReplyCommentInput = ({commentId, loggedUser, postId}) => {

    const [input, setInput] = useState('');

    const onReplayCommentSubmit = (e) => {
        e.preventDefault();

        // Dispatch action that adds new sub_comment to this comments object in db
    }

    return (
        <form onSubmit={onReplayCommentSubmit} className='reply-comment-input-container'>
            
            <img src={loggedUser.avatar_img} alt="avatar" className="logged-user-avatar" />

            <input placeholder='Reply with something...' type='text' onChange={(e) => setInput(e.target.value)} value={input} className='input'/>
            
            <div className='reply-btn-container'>
                <button type='submit' className='reply-btn'>
                    Reply
                </button>
            </div>
        </form>
    )
}

export default ReplyCommentInput;
