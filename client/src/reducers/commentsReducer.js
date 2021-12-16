import { CREATE_COMMENT, GET_COMMENTS } from "../utils/action_constants";


const commentsReducer = (state=[], action) => {
    switch(action.type) {
        case GET_COMMENTS:
            return action.payload.data;
        case CREATE_COMMENT:
            return [action.payload.data, ...state];
        default:
            return state; 
    }
}

export default commentsReducer;