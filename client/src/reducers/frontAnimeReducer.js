import { GET_ANIME } from "../utils/action_constants";

const frontAnimeReducer = (state=[], action) => {
    switch(action.type){
        case GET_ANIME:
            // console.log(action.payload);
            return [...state, action.payload];
        default:
            return state;
    }
}

export default frontAnimeReducer;