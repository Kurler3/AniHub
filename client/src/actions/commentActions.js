import * as api from '../api';
import { GET_COMMENTS } from '../utils/action_constants';


export const getComments = (postId) => async (dispatch) => {
    try {
        const {data} = await api.getComments(postId);

        dispatch({type:GET_COMMENTS, payload:data});
    } catch (error) {
        console.log(error);
    }
}