import * as api from "../api/";
import { GET_MEDIA_HOME_POSTS } from "../utils/action_constants";

export const getMediaHomePosts = (filter) => async (dispatch) => {
    try {
        const {data} = await api.getMediaHomePosts(filter);

        dispatch({type:GET_MEDIA_HOME_POSTS, payload:data});
    } catch (error) {
        console.log(error);
    }
}