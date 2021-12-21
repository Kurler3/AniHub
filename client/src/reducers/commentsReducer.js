import { CREATE_COMMENT, GET_COMMENTS, REPLY_COMMENT, VOTE_COMMENT} from "../utils/action_constants";


const commentsReducer = (state=[], action) => {
    let index;
    let newState;
    switch(action.type) {
        case GET_COMMENTS:
            return action.payload.data;
        case CREATE_COMMENT:
            return [action.payload, ...state];
        case REPLY_COMMENT:

            newState = [...state,action.payload.data.reply];
            // Change the parent comment of this sub comment
            index = state.findIndex((comment) => comment._id === action.payload.data.updatedComment._id);

            newState[index] = action.payload.data.updatedComment;

            return newState;
        case VOTE_COMMENT:
            // Find index
            index = state.findIndex((comment) => comment._id===action.payload.data._id);
            // Substitute for new comment.
            newState = state;
            newState[index] = action.payload.data;
            // return new array
            return newState;
        default:
            return state; 
    }
}

export default commentsReducer;