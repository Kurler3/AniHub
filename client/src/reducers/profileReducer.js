import { UPDATE_STATE, CHANGE_FILTER, CHANGE_DATA } from "../utils/action_constants";
import { PROFILE_FILTERS } from "../utils/constants";

const profileReducer = (state={data:[], type:PROFILE_FILTERS[0]}, action) => {
    switch(action.type) {
        case UPDATE_STATE:
            return action.payload.data;
        case CHANGE_FILTER:
            return {...state, type:action.payload};
        case CHANGE_DATA:
            return {data:action.payload.data.data, type:action.payload.newFilter};
        default:
            return state;
    }
}

export default profileReducer;