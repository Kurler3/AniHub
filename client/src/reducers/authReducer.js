import { AUTH, LOGOUT} from "../utils/action_constants";

const authReducer = (state = {authData:null}, action) => {
    switch(action.type){
        case AUTH:
            // Save in the local storage, because once we 
            // refresh the page, the browser is still gonna know that the user is logged in
            // Saves user and token
            localStorage.setItem('profile', JSON.stringify({...action?.data}));

            return {...state, authData: action?.data};
        case LOGOUT:
            // When the local storage is cleared the components will react  
            localStorage.clear();
            return {...state, authData:null};
        default:
            return state;        
    }
}

export default authReducer;