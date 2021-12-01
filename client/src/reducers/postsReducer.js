import { GET_POSTS, CREATE_POST, FILTER_POSTS } from "../utils/action_constants";
import { MEDIA_POST_FILTERS } from "../utils/constants";

const postsReducer = (state=[], action) => {
    switch(action.type) {
        case GET_POSTS:
            return action.payload.data;
        case CREATE_POST:
            return [...state, action.payload];
        case FILTER_POSTS:
            // get the filter
            // sort the current state by the filter (switch statement) 
            // return new sorted posts array
            
            const filter = action.payload;

            switch(filter) {
                case MEDIA_POST_FILTERS[0]:
                    return state.sort((a,b) => a.created_at - b.created_at);
                case MEDIA_POST_FILTERS[1]:
                    return state.sort((a,b) => b.viewed_by.length - a.viewed_by.length);
                case MEDIA_POST_FILTERS[2]:
                    return state.sort((a,b) => b.upvoted_by.length - a.upvoted_by.length);
            }
        default:
            return state;
    }
}

export default postsReducer;