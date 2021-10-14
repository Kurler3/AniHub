import { combineReducers } from "redux";
import frontAnimeReducer from './frontAnimeReducer';
import authReducer from './authReducer';
import backAnimeReducer from "./backAnimeReducer";
import mediaHomeReducer from "./mediaHomeReducer";
import communityReducer from "./communityReducer";

export default combineReducers({
    frontAnimes: frontAnimeReducer,
    auth: authReducer,
    backAnimes: backAnimeReducer,
    mediaHomePosts:mediaHomeReducer,
    community:communityReducer,
});