import { CREATE_COMMUNITY, SEARCH_COMMUNITIES } from "../utils/action_constants";

const reducer = (state={searchList:[], current:{}}, action) => {
    switch(action.type) {
        case CREATE_COMMUNITY:
            return {...state, current:action.payload.data};
        case SEARCH_COMMUNITIES:
            return {...state, searchList:[...state.searchList, action.payload.data]};
        default:
            return state;
    }
}

export default reducer;