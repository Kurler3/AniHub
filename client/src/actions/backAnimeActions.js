import * as api from '../api/';
import {ADD_BACK_ANIME, GET_ANIME_LIST} from '../utils/action_constants';

export const addAnimeToList = (anime) => async (dispatch) => {
    try {
        
        const {data} = await api.addAnimeToList(anime);

        console.log(data);

        dispatch({type:ADD_BACK_ANIME, payload: data});
    } catch (error) {
        console.log(error);
    }

}

export const getAnimeList = () => async (dispatch) => {
    try {
        
        const { data } = await api.getAnimeList();

        dispatch({type:GET_ANIME_LIST, payload:data});
    } catch (error) {
        console.log(error);
    }
}