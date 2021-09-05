import * as api from "../api/frontAnimeApi"
import { GET_ANIME } from "../utils/action_constants";

export const getAnime = (filter) => async (dispatch) => {
    try {
        
        const {data} = await api.getAnime(filter);

        dispatch({type:GET_ANIME, payload:data});
    } catch (error) {
        console.log(error);        
    }
}
