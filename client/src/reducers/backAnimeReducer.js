import { ADD_BACK_ANIME, GET_ANIME_LIST, REMOVE_ANIME_FROM_LIST, CLEAR_LIST, UPDATE_EPISODE } from "../utils/action_constants";

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

            return user.result.saved_animes;
        case REMOVE_ANIME_FROM_LIST:
            // Update user in localStorage
            user = JSON.parse(localStorage.getItem('profile'));

            user.result.saved_animes = state.filter((anime) => anime.id!==action.payload.data.id);

            localStorage.setItem('profile', JSON.stringify(user));

            // Filters out the id of the anime that was removed
            return user.result.saved_animes;
        case UPDATE_EPISODE:
            
            const animeIndex = state.findIndex((anime) => anime.id===action.payload.data.id);

            state[animeIndex].current_episode = action.payload.data.current_episode;

            return state;
        case CLEAR_LIST:
            return [];
        default:
            return state;
    }
}

export default backAnimeReducer;