import { combineReducers } from "redux";
import frontAnimeReducer from './frontAnimeReducer';

export default combineReducers({
    frontAnimes: frontAnimeReducer,
});