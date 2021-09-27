import { ADD_BACK_ANIME, GET_ANIME_LIST, REMOVE_ANIME_FROM_LIST } from "../utils/action_constants";

const backAnimeReducer = (state=[], action) => {
    
    let user;

    switch(action.type){
        case GET_ANIME_LIST:
            return action.payload.data;
        case ADD_BACK_ANIME:
            // Update user in localStorage
            user = JSON.parse(localStorage.getItem('profile'));

            user.result.saved_animes = [...state, action.payload.data];

            localStorage.setItem('profile', JSON.stringify(user));

            // Action payload is going to be added anime
            return user.result.saved_animes;
        case REMOVE_ANIME_FROM_LIST:
            // Update user in localStorage
            user = JSON.parse(localStorage.getItem('profile'));

            user.result.saved_animes = state.filter((anime) => anime.id!==action.payload.data.id);

            localStorage.setItem('profile', JSON.stringify(user));

            // Filters out the id of the anime that was removed
            return user.result.saved_animes;
        default:
            return state;
    }
}

export default backAnimeReducer;