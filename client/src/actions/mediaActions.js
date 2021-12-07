import * as api from "../api/";
import { GET_POSTS, CREATE_POST, FILTER_POSTS, VOTE_POST } from "../utils/action_constants";

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

export const filterPosts = (filter) => async (dispatch) => {
    try {
        
        dispatch({type:FILTER_POSTS, payload:filter});

    } catch (error) {
        console.log(error);
    }
}

export const votePost = (postId, userId, isUpVote) => async (dispatch) => {
    try {
        
        const {data} = await api.votePost(postId, userId, isUpVote);

        // Payload is going to be the new object
        // Will substitute new for old in the state reducer
        // Which will make PostList.js re-render this PostCard.js
        // Making it dynamic
        
        dispatch({type:VOTE_POST, payload:data});
    } catch (error) {
        console.log(error);
    }
}