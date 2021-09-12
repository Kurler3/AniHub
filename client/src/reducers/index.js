import { combineReducers } from "redux";
import frontAnimeReducer from './frontAnimeReducer';
import authReducer from './authReducer';

export default combineReducers({
    frontAnimes: frontAnimeReducer,
    auth: authReducer,
});