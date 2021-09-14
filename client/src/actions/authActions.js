import * as api from "../api/";
import { AUTH } from "../utils/action_constants";

// Deconstruct the object to just email and password
export const signIn = (formData, history) => async (dispatch) => {
    try {
        // Should call the back end api for login
        // Get the user and the token from the back end
        const {data} = await api.signIn(formData);

        // Back to homepage
        history.push('/');

        // Dispatch to reducer
        dispatch({type:AUTH, data});
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {

        // Call the back end api for signup
        const {data} = await api.signUp(formData);

        // Back to homepage
        history.push('/');

        // Dispatch to reducer
        dispatch({type:AUTH, data});
    } catch (error) {
        console.log(error);
    }
}