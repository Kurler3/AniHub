import { GET_POSTS, CREATE_POST, FILTER_POSTS, VOTE_POST, DELETE_POST, UPDATE_POST } from "../utils/action_constants";
import { MEDIA_POST_FILTERS } from "../utils/constants";

const postsReducer = (state={posts:[], filter:MEDIA_POST_FILTERS[0]}, action) => {
    switch(action.type) {
        case GET_POSTS:

            let sortFunction;

            switch(state.filter) {
                case MEDIA_POST_FILTERS[0]:
                    sortFunction = (a,b) => a.created_at - b.created_at;
                    break;
                case MEDIA_POST_FILTERS[1]:
                    sortFunction = (a,b) => b.viewed_by.length - a.viewed_by.length;
                    break;
                case MEDIA_POST_FILTERS[2]:
                    sortFunction = (a,b) => b.upvoted_by.length - a.upvoted_by.length;
                    break;
            }

            return {...state, posts:action.payload.data.sort(sortFunction)};
        case CREATE_POST:
            return [...state, action.payload];
        case FILTER_POSTS:
            // Since PostList.js is listening to state.filter changes, then each time this data changes, the component will
            // Fetch the array again, sorted by the new filter.
            return {...state, filter:action.payload};
        case VOTE_POST:
            // action.payload.data will be new post object
            
            const stateArray = state;
            // Here need to substitute old object in the array for new one
            // use the id to find its index in the array 
            const index = stateArray.findIndex((post) => post._id === action.payload.data._id);

            stateArray[index] = action.payload.data;

            // Needs to change to new array
            return stateArray;
        case DELETE_POST:

            console.log(action.payload);

            return state.posts.filter((post) => post._id!==action.payload._id);
        case UPDATE_POST:
            // Find post index in current state
            const updateIndex = state.posts.findIndex((post) => post._id === action.payload._id);
            // Update post object in that index
            const newPosts = state.posts;
            newPosts[updateIndex] = action.payload;
            // return new updated array as the state.posts
            return {...state, posts:newPosts};
        default:
            return state;
    }
}

export default postsReducer;