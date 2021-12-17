import * as api from '../api';
import { CREATE_COMMENT, GET_COMMENTS, REPLY_COMMENT } from '../utils/action_constants';

export const getComments = (postId) => async (dispatch) => {
    try {
        const {data} = await api.getComments(postId);

        dispatch({type:GET_COMMENTS, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const createComment = (createdBy, postId, content, isSubComment) => async (dispatch) => {
    try {
        
        const {data} = await api.createComment(createdBy,postId,content, isSubComment);

        dispatch({type:CREATE_COMMENT, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const replyComment = (commentId, userId, postId, input) => async (dispatch) => {
    try {
        
        const {data} = await api.replyComment(commentId, userId, postId, input);

        dispatch({type:REPLY_COMMENT, payload:data});
    } catch (error) {
        console.log(error);
    }
}