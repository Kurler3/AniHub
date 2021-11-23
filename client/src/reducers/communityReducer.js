import { CREATE_COMMUNITY, GET_ALL_COMMUNITIES, SEARCH_COMMUNITIES, SEARCH_COMMUNITY, SUB_UNSUB_COMMUNITIES, UPDATE_SUB_UNSUB_COMMUNITY} from "../utils/action_constants";

const reducer = (state={searchList:[], current:{}}, action) => {

    let user;

    switch(action.type) {
        case CREATE_COMMUNITY:

            // Update user's subscribed list in local storage (already updated in database)
            user = JSON.parse(localStorage.getItem('profile'));

            user.result.communities_subscribed.push(action.payload.data.title);

            localStorage.setItem('profile', JSON.stringify(user));

            // Automatically make current to be this new community, since when the 
            // back-end call is returned, the action redirects the user to this 
            // community page and it is waiting for the current value using
            // useSelector 
            
            return {...state, current:action.payload.data};
        case SEARCH_COMMUNITIES:
            return {...state, searchList:action.payload.data};
        case SEARCH_COMMUNITY:
            return {...state, current:action.payload.data};
        case GET_ALL_COMMUNITIES:
            return {...state, searchList:action.payload.data};
        case SUB_UNSUB_COMMUNITIES:
            // payload is new subscribed community array
            // Update users communities subscribed in local storage
            
            user = JSON.parse(localStorage.getItem('profile'));

            user.result.communities_subscribed = action.payload.data;

            localStorage.setItem('profile',JSON.stringify(user));

            return state;
        case UPDATE_SUB_UNSUB_COMMUNITY:
            return {...state, current:action.payload.data};
        default:
            return state;
    }
}

export default reducer;