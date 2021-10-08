import { GET_TOP_ANIME, GET_SEASON_ANIME, SEARCH_ANIME } from "../utils/action_constants";

const frontAnimeReducer = (state=[], action) => {
    switch(action.type){
        case GET_TOP_ANIME:
            if(state.length===0) return [...state,action.payload];
            return [action.payload];
        case GET_SEASON_ANIME:
            return [action.payload];
        case SEARCH_ANIME:
            return [action.payload];
        default:
            return state;
    }
}

export default frontAnimeReducer;