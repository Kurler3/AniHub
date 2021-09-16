import * as api from '../api/';
import {ADD_BACK_ANIME} from '../utils/action_constants';

export const addAnimeToList = (anime) => async (dispatch) => {
    try {
        
        const {data} = await api.addAnimeToList(anime);

        console.log(data);

        dispatch({type:ADD_BACK_ANIME, payload: data});
    } catch (error) {
        console.log(error);
    }

}