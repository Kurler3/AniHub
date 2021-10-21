import { GET_POSTS } from "../utils/action_constants";

const postsReducer = (state=[], action) => {
    switch(action.type) {
        case GET_POSTS:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default postsReducer;