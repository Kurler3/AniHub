import * as api from '../api';
import { CHANGE_FILTER, CHANGE_DATA } from "../utils/action_constants";
import { PROFILE_FILTERS } from '../utils/constants';


export const changeProfileFilter = (newFilter) => async (dispatch) => {
    try {
        dispatch({type:CHANGE_FILTER, payload:newFilter});
    } catch (error) {
        console.log(error);   
    }
}

export const getProfilePosts = (userId) => async (dispatch) => {
    try {
        const {data} = await api.getProfilePosts(userId);

        dispatch({type:CHANGE_DATA, payload:{data, newFilter:PROFILE_FILTERS[2]}});
    } catch (error) {
        console.log(error);
    }
} 

export const getProfileComments = (userId) => async (dispatch) => {
    try {
        const {data} = await api.getProfileComments(userId);

        dispatch({type:CHANGE_DATA, payload:{data, newFilter:PROFILE_FILTERS[3]}});
    } catch (error) {
        console.log(error);
    }
}

export const getVotedPosts = (userId, getUpVoted) => async (dispatch) => {
    try {
        const {data} = await api.getVotedPosts(userId, getUpVoted);

        dispatch({type:CHANGE_DATA, payload:{data, newFilter:PROFILE_FILTERS[getUpVoted ? 4 : 5]}});
    } catch (error) {
        console.log(error);
    }
}