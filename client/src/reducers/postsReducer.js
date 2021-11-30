import { GET_POSTS, CREATE_POST } from "../utils/action_constants";

const postsReducer = (state=[], action) => {
    switch(action.type) {
        case GET_POSTS:

            console.log(action.payload);

            return [action.payload];
        case CREATE_POST:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default postsReducer;