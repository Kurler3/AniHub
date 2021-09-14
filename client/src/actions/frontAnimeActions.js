import * as api from "../api/";
import { GET_TOP_ANIME, GET_SEASON_ANIME } from "../utils/action_constants";

export const getTopAnime = () => async (dispatch) => {
    try {
        
        const {data} = await api.getTopAnime();

        dispatch({type:GET_TOP_ANIME, payload:data.top});
    } catch (error) {
        console.log(error);        
    }
}

export const getSeasonAnime = (filter) => async (dispatch) => {
    try {
        
        const {data} = await api.getSeasonAnime(filter);

        dispatch({type:GET_SEASON_ANIME, payload:data.anime});
    } catch (error) {
        console.log(error);        
    }
}
