import * as api from "../api/";
import { GET_POSTS, CREATE_POST } from "../utils/action_constants";

export const getPosts = (communityTitle, subscribed_communities) => async (dispatch) => {
    try {
        const {data} = await api.getPosts(communityTitle, subscribed_communities);

        dispatch({type:GET_POSTS, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (inputData, userId, history) => async (dispatch) => {
    try {
        const {data} = await api.createPost(inputData, userId);

        history.push('/media');

        dispatch({type: CREATE_POST, payload:data});
    } catch (error) {
        console.log(error);
    }
}