import { GET_MEDIA_HOME_POSTS } from "../utils/action_constants";

const mediaHomeReducer = (state=[], action) => {
    switch(action.type) {
        case GET_MEDIA_HOME_POSTS:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default mediaHomeReducer;