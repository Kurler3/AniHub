import { ADD_BACK_ANIME, GET_ANIME_LIST } from "../utils/action_constants";

const backAnimeReducer = (state=[], action) => {
    switch(action.type){
        case GET_ANIME_LIST:
            return action.payload.data;
        case ADD_BACK_ANIME:
            // Action payload is going to be added anime
            return [...state, action.payload];
        default:
            return state;
    }
}

export default backAnimeReducer;