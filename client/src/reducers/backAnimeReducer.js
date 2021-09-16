import { ADD_BACK_ANIME } from "../utils/action_constants";

const backAnimeReducer = (state=[], action) => {
    switch(action.type){
        case ADD_BACK_ANIME:
            // Action payload is going to be added anime

            const newState = [...state, action.payload];

            console.log(newState);

            return [...state, action.payload];
        default:
            return state;
    }
}

export default backAnimeReducer;