import * as api from "../api/";
import { CREATE_COMMUNITY, GET_ALL_COMMUNITIES, SEARCH_COMMUNITIES, SEARCH_COMMUNITY, UPDATE_SUB_UNSUB_COMMUNITY  } from "../utils/action_constants";

export const createCommunity = (inputData, history) => async (dispatch) => {
    try {
        
        const {data} = await api.createCommunity(inputData);

        history.push(`/media/${inputData['title']}`);

        dispatch({type:CREATE_COMMUNITY, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const searchCommunities = (text) => async (dispatch) => {
    try {
        const {data} = await api.searchCommunities(text);

        dispatch({type:SEARCH_COMMUNITIES, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const searchCommunity = (communityName) => async (dispatch) => {
    try {
        
        const {data} = await api.searchCommunity(communityName);

        dispatch({type:SEARCH_COMMUNITY, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const getAllCommunities = () => async (dispatch) => {
    try {
        
        const {data} = await api.getAllCommunities();

        dispatch({type:GET_ALL_COMMUNITIES, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const updateSubUnsubCommunity = (userId, communityTitle, isUnSub) => async (dispatch) => {
    try {
        
        const {data} = await api.updateSubUnsubCommunity(userId, communityTitle, isUnSub);

        dispatch({type:UPDATE_SUB_UNSUB_COMMUNITY, payload: data});
    } catch (error) {
        console.log(error);
    }
}