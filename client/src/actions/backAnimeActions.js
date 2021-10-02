import * as api from '../api/';
import {ADD_BACK_ANIME, GET_ANIME_LIST, REMOVE_ANIME_FROM_LIST, UPDATE_EPISODE} from '../utils/action_constants';

export const addAnimeToList = (anime) => async (dispatch) => {
    try {
        
        const {data} = await api.addAnimeToList(anime);

        dispatch({type:ADD_BACK_ANIME, payload: data});
    } catch (error) {
        console.log(error);
    }

}

export const removeAnimeFromList = (anime) => async (dispatch) => {
    try {
        
        const {data} = await api.removeAnimeFromList(anime);

        dispatch({type:REMOVE_ANIME_FROM_LIST, payload:data});
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

export const updateAnimeEpisode = (id, episode) => async (dispatch) => {
    try {
        
        const {data} = await api.updateAnimeEpisode(id, episode);

        dispatch({type:UPDATE_EPISODE, payload:data});

    } catch (error) {
        console.log(error);
    }
}