import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getComments } from '../actions/commentActions';

const CommentList = ({postId}) => {

    const dispatch = useDispatch();

    const comments = useSelector(state => state.comments);

    useEffect(() => {
        dispatch(getComments(postId));
    }, []);

    return (
        <div>
            
        </div>
    )
}

export default CommentList;
