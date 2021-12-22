import { UPDATE_STATE } from "../utils/action_constants";
import { PROFILE_FILTERS } from "../utils/constants";

const profileReducer = (state={data:[], type:PROFILE_FILTERS[0]}, action) => {
    switch(action.type) {
        case UPDATE_STATE:
            return action.payload.data;
    }
}

export default profileReducer;