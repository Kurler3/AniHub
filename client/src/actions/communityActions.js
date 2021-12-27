import * as api from "../api/";
import { CREATE_COMMUNITY, GET_ALL_COMMUNITIES, SEARCH_COMMUNITIES, SEARCH_COMMUNITY, UPDATE_SUB_UNSUB_COMMUNITY, REMOVE_MEMBER_FROM_COMMUNITY, BLOCK_MEMBER_FROM_COMMUNITY, ADD_ADMIN_TO_COMMUNITY, ADD_REMOVE_MOD  } from "../utils/action_constants";

export const createCommunity = (inputData, history) => async (dispatch) => {
    try {
        
        const {data} = await api.createCommunity(inputData);

        history.push(`/media/${inputData['title']}`);

        dispatch({type:CREATE_COMMUNITY, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const searchCommunities = (text, userId) => async (dispatch) => {
    try {
        const {data} = await api.searchCommunities(text, userId);

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

export const getAllCommunities = (userId) => async (dispatch) => {
    try {
        
        const {data} = await api.getAllCommunities(userId);

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

export const removeMember = (communityTitle, memberId) => async (dispatch) => {
    try {
        
        const {data} = await api.removeMember(communityTitle, memberId);

        dispatch({type:REMOVE_MEMBER_FROM_COMMUNITY, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const blockMember = (communityTitle, memberId) => async (dispatch) => {
    try {
        
        const {data} = await api.blockMember(communityTitle, memberId);

        dispatch({type:BLOCK_MEMBER_FROM_COMMUNITY, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const addAdmin = (communityTitle, memberId) => async (dispatch) => {
    try {
        const {data} = await api.addAdmin(communityTitle, memberId);

        dispatch({type:ADD_ADMIN_TO_COMMUNITY, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const addRemoveMod = (communityTitle, memberId, isRemove) => async (dispatch) => {
    try {
        const {data} = await api.addRemoveMod(communityTitle, memberId, isRemove);

        dispatch({type:ADD_REMOVE_MOD, payload:data});
    } catch (error) {
        console.log(error);
    }
}