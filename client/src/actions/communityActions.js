import * as api from "../api/";
import { CREATE_COMMUNITY, SEARCH_COMMUNITIES  } from "../utils/action_constants";

export const createCommunity = (inputData, history) => async (dispatch) => {
    try {
        
        const {data} = await api.createCommunity(inputData);

        history.push(`/media/r/${inputData['title']}`);

        dispatch({type:CREATE_COMMUNITY, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const searchCommunities = (text) => async (dispatch) => {
    try {
        const data = await api.searchCommunities(text);

        dispatch({type:SEARCH_COMMUNITIES, payload:data});
    } catch (error) {
        console.log(error);
    }
}