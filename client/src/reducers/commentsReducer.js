import { CREATE_COMMENT, GET_COMMENTS, REPLY_COMMENT} from "../utils/action_constants";


const commentsReducer = (state=[], action) => {
    switch(action.type) {
        case GET_COMMENTS:
            console.log(action.payload.data);
            return action.payload.data;
        case CREATE_COMMENT:
            return [action.payload, ...state];
        case REPLY_COMMENT:

            console.log(action.payload.data);


            const newState = [...state,action.payload.data.reply];
            // Change the parent comment of this sub comment
            const index = state.findIndex((comment) => comment._id === action.payload.data.updatedPost._id);

            newState[index] = action.payload.data.updatedPost;


            return newState;
        default:
            return state; 
    }
}

export default commentsReducer;