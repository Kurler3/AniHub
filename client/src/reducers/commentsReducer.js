import { GET_COMMENTS } from "../utils/action_constants";

const commentsReducer = (state=[], action) => {
    switch(action.type){
        case GET_COMMENTS:
            return action.payload;
        default:
            return state;
    }
}

export default commentsReducer;