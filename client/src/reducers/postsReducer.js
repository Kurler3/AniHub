import { GET_POSTS, CREATE_POST, FILTER_POSTS, VOTE_POST } from "../utils/action_constants";
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
            break;
        case VOTE_POST:
            // action.payload.data will be new post object
            
            const stateArray = state;
            // Here need to substitute old object in the array for new one
            // use the id to find its index in the array 
            const index = stateArray.findIndex((post) => post._id === action.payload.data._id);

            stateArray[index] = action.payload.data;

            // Needs to change to new array
            return stateArray;
        default:
            return state;
    }
}

export default postsReducer;