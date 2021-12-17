import { CREATE_COMMENT, GET_COMMENTS, REPLY_COMMENT } from "../utils/action_constants";


const commentsReducer = (state=[], action) => {
    switch(action.type) {
        case GET_COMMENTS:
            return action.payload.data;
        case CREATE_COMMENT:
            return [action.payload.data, ...state];
        case REPLY_COMMENT:
            // Get new updated Comment with new sub_comment array.  
            // Substitute for old comment in state
            const index = state.findIndex((comment) => comment._id === action.payload.data._id);

            const newState = state;

            newState[index] = action.payload.data;
    
            return newState;
        default:
            return state; 
    }
}

export default commentsReducer;