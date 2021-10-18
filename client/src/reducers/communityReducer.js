import { CREATE_COMMUNITY, GET_ALL_COMMUNITIES, SEARCH_COMMUNITIES, SEARCH_COMMUNITY} from "../utils/action_constants";

const reducer = (state={searchList:[], current:{}}, action) => {

    let user;

    switch(action.type) {
        case CREATE_COMMUNITY:

            // Update user's subscribed list in local storage (already updated in database)
            user = JSON.parse(localStorage.getItem('profile'));

            user.result.communities_subscribed.push(action.payload.data.title);

            localStorage.setItem('profile', JSON.stringify(user));

            return {...state, current:action.payload.data};
        case SEARCH_COMMUNITIES:
            return {...state, searchList:[...state.searchList, action.payload.data]};
        case SEARCH_COMMUNITY:
            return {...state, current:action.payload.data};
        case GET_ALL_COMMUNITIES:
            return {...state, searchList:action.payload.data};
        default:
            return state;
    }
}

export default reducer;